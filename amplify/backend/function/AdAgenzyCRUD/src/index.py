from decimal import Decimal
from flask_cors import CORS
from flask import Flask, jsonify, request
import awsgi
import boto3
import json
from uuid import uuid4
from boto3.dynamodb.conditions import BeginsWith, Key
import urllib.parse

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table('adagenzytable-dev')

# Constant variable with path prefix
BASE_ROUTE = "/items"

app = Flask(__name__)
CORS(app)

@app.route(BASE_ROUTE + '/listproducts', methods=['GET'])
def list_products():
    item = table.query(
        IndexName='GSI1',
        KeyConditionExpression='#SK = :value',

        ExpressionAttributeValues={
            ':value': 'products'
        },
        ExpressionAttributeNames={
            '#SK': 'SK'
        }
    )

    return jsonify(item)