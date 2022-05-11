const express = require('express');
const app = express();
const cors = require('cors');
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

app.use(cors());

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.get('/v1/pod', async (req, res) => {
    const response = (await k8sApi.listNamespacedPod('')).response;
    console.log(response.statusCode);
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

app.get('/v1/node', async (req, res) => {
    const response = (await k8sApi.listNode()).response;
    console.log(response.statusCode);
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

app.get('/v1/namespace', async (req, res) => {
    const response = (await k8sApi.listNamespace()).response;
    console.log(response.statusCode);
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

k8sApi.listNamespacedPod('default').then((res) => {
    console.log(res.body);
});

app.listen(7000, () => {
    console.log('Server started on port 7000');
});