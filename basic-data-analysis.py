# Objective: Given a csv of transaction data, write functions that return:
# Top Spending Users
# Monthly Spending Trends
# Product Popularity
# Outliers

import pandas as pd
import numpy as np

def load_data(file_path):
    return pd.read_csv(file_path, parse_dates=['transaction_date'])

def top_spending_users(df):
    return df.groupby('user_id')['amount'].sum().nlargest(5).reset_index()

def monthly_spending_trends(df):
    df['month'] = df['transaction_date'].dt.to_period('M')
    monthly_trends = df.groupby('month')['amount'].sum().reset_index()
    return monthly_trends

def product_popularity(df):
    return df['product_id'].value_counts().nlargest(5).reset_index(name='transaction_count')

def identify_outliers(df):
    Q1 = df['amount'].quantile(0.25)
    Q3 = df['amount'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return df[(df['amount'] < lower_bound) | (df['amount'] > upper_bound)]


df = load_data('transactions.csv')

top_users = top_spending_users(df)
print(top_users)

monthly_trends = monthly_spending_trends(df)
print(monthly_trends)

popular_products = product_popularity(df)
print(popular_products)

outliers = identify_outliers(df)
print(outliers)