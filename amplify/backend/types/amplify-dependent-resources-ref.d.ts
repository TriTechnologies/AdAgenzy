export type AmplifyDependentResourcesAttributes = {
    "function": {
        "SaaSProComp": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
<<<<<<< Updated upstream
=======
        },
        "AdAgenzyCRUD": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
>>>>>>> Stashed changes
        }
    },
    "auth": {
        "adagenzy": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "SaaSProComp": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
<<<<<<< Updated upstream
=======
        },
        "AdAgenzyCRUD": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
>>>>>>> Stashed changes
        }
    },
    "storage": {
        "adagenzytable": {
            "Name": "string",
            "Arn": "string",
            "StreamArn": "string",
            "PartitionKeyName": "string",
            "PartitionKeyType": "string",
            "SortKeyName": "string",
            "SortKeyType": "string",
            "Region": "string"
        }
    }
}