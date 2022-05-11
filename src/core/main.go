package main

import (
	"context"
	"flag"
	"path/filepath"

	"github.com/gin-gonic/gin"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
)

func main() {

	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "", "absolute path to the kubeconfig file")
	}
	flag.Parse()

	// use the current context in kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		panic(err.Error())
	}

	// create the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	r := gin.Default()

	r.Use(CORSMiddleware())

	r.GET("/v1/api/pod", func(c *gin.Context) {
		pods, err := clientset.CoreV1().Pods("").List(context.TODO(), metav1.ListOptions{})
		if err != nil {
			panic(err.Error())
		}
		c.JSON(200, gin.H{
			"error": false,
			"data":  pods,
		})
	})

	r.GET("/v1/api/node", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"error": false,
			"data":  getNodes(clientset),
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}

type PodObject struct {
	Name  string
	Phase string
}

type NodeObject struct {
	Name                    string
	Phase                   string
	OSImage                 string
	ContainerRuntimeVersion string
	KubeletVersion          string
	KernelVersion           string
}

func getPods(clientset *kubernetes.Clientset) []PodObject {

	pods, err := clientset.CoreV1().Pods("").List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}

	podObjects := make([]PodObject, len(pods.Items))

	for i := 0; i < len(pods.Items); i++ {
		podObjects[i] = PodObject{pods.Items[i].Name, string(pods.Items[i].Status.Phase)}
	}

	return podObjects
}

func getNodes(clientset *kubernetes.Clientset) []NodeObject {

	nodes, err := clientset.CoreV1().Nodes().List(context.TODO(), metav1.ListOptions{})
	if err != nil {
		panic(err.Error())
	}

	podObjects := make([]NodeObject, len(nodes.Items))

	for i := 0; i < len(nodes.Items); i++ {
		podObjects[i] = NodeObject{
			nodes.Items[i].Name,
			string(nodes.Items[i].Status.Phase),
			nodes.Items[i].Status.NodeInfo.OSImage,
			nodes.Items[i].Status.NodeInfo.ContainerRuntimeVersion,
			nodes.Items[i].Status.NodeInfo.KubeletVersion,
			nodes.Items[i].Status.NodeInfo.KernelVersion,
		}
	}

	return podObjects
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
