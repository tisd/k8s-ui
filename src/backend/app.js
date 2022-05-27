const express = require('express');
const app = express();
const cors = require('cors');
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

app.use(cors('https://tisd-k8s-ui-rp9x5gxgcp6q5-3000.githubpreview.dev'));

const coreV1Api = kc.makeApiClient(k8s.CoreV1Api);
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);

// Pods

app.get('/v1/pod', async (req, res) => {
    const response = (await coreV1Api.listNamespacedPod('')).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching pods'
        });
    }

    res.json({
        error: false,
        data: response.body.items
    });

});

app.get('/v1/pod/:namespace/:podName/logs', async (req, res) => {
    const response = (await coreV1Api.readNamespacedPodLog(req.params.podName, req.params.namespace, {})).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching pod logs'
        });
    }

    res.json({
        error: false,
        data: response.body
    });
});

app.get('/v1/pod/:namespace/:podName/', async (req, res) => {
    const response = (await coreV1Api.readNamespacedPod(req.params.podName, req.params.namespace)).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching pod'
        });
    }

    res.json({
        error: false,
        data: response.body
    });
});

app.get('/v1/pod/:namespace/:podName/events', async (req, res) => {
    console.log(req.params.namespace, req.params.podName);
    const response = (await coreV1Api.listNamespacedEvent(req.params.namespace, {
        fieldSelector: `involvedObject.name=${req.params.podName}`
    })).response;

    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching pod events'
        });
    }

    res.json({
        error: false,
        data: response.body.items
    });
});

// Deployments

app.get('/v1/deployment', async (req, res) => {
    const response = (await appsV1Api.listDeploymentForAllNamespaces('')).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching deployments'
        });
    }

    res.json({
        error: false,
        data: response.body.items
    });

});

app.get('/v1/deployment/:namespace/:deploymentName', async (req, res) => {
    const response = (await appsV1Api.readNamespacedDeployment(req.params.deploymentName, req.params.namespace)).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching deployment'
        });
    }

    res.json({
        error: false,
        data: response.body
    });
});

// Services

app.get('/v1/service', async (req, res) => {
    const response = (await coreV1Api.listNamespacedService('')).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching services'
        });
    }

    res.json({
        error: false,
        data: response.body.items
    });
});

// Nodes

app.get('/v1/node', async (req, res) => {
    const response = (await coreV1Api.listNode()).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching nodes'
        });
    }

    res.json({
        error: false,
        data: response.body.items
    });
});

// Namespaces

app.get('/v1/namespace', async (req, res) => {
    const response = (await coreV1Api.listNamespace()).response;
    if (response.statusCode !== 200) {
        return res.json({
            error: true,
            message: 'Error fetching namespaces'
        });
    }

    res.json({
        error: false,
        data: response.body.items
    });
});

coreV1Api.listNamespacedPod('default').then((res) => {
    console.log(res.body);
});

app.listen(7000, () => {
    console.log('Server started on port 7000');
});