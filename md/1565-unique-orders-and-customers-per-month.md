### Leetcode 1565 (Easy): Unique Orders and Customers Per Month [Practice](https://leetcode.com/problems/unique-orders-and-customers-per-month)

### Description  
Given an Orders table (OrderID, OrderDate, CustomerID, ...) write SQL to count the number of unique orders and unique customers per month. Return (Year, Month, customer_count, order_count).

### Examples  

**Example 1:**  
Input: Orders:  
| OrderID | OrderDate  | CustomerID |
| ------- | ---------- | ---------- |
| 1       | 2020-06-01 | 1          |
| 2       | 2020-06-05 | 2          |
| 3       | 2020-07-10 | 1          |
| 4       | 2020-07-15 | 3          |

Output:  
| year | month | customer_count | order_count |
| ---- | ----- | -------------- | ----------- |
| 2020 | 6     | 2              | 2           |
| 2020 | 7     | 2              | 2           |

*Explanation: June 2020: 2 customers (1&2), 2 orders. July 2020: 2 customers (1&3), 2 orders.*

**Example 2:**  
Input: Orders:  
| OrderID | OrderDate  | CustomerID |
| ------- | ---------- | ---------- |
| 1       | 2021-05-03 | 42         |

Output:  
| year | month | customer_count | order_count |
| ---- | ----- | -------------- | ----------- |
| 2021 | 5     | 1              | 1           |

*Explanation: May 2021: 1 customer, 1 order.*

**Example 3:**  
Input: Orders table empty
Output: Empty table
*Explanation: Nothing to show.*


### Thought Process (as if you’re the interviewee)  
This is an SQL aggregation problem. Group by the year and month extracted from OrderDate, count unique CustomerID for customer_count, and count unique OrderIDs for order_count. Use EXTRACT or similar date-functions as appropriate for platform.


### Corner cases to consider  
- Empty Orders table
- Multiple orders from same customer in a month
- Only one unique customer or order in a period


### Solution

```sql
SELECT
    EXTRACT(YEAR FROM OrderDate) AS year,
    EXTRACT(MONTH FROM OrderDate) AS month,
    COUNT(DISTINCT CustomerID) AS customer_count,
    COUNT(DISTINCT OrderID) AS order_count
FROM Orders
GROUP BY year, month
ORDER BY year, month;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) with respect to number of rows
- **Space Complexity:** O(k), where k is number of year/month buckets


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle timezones or different formats?
  *Hint: Normalize OrderDate values first.*

- What if you wanted to include months with no orders?
  *Hint: Need a calendar or months reference table and left join.*

- Can you show top N months with most customers?
  *Hint: Use ORDER BY customer_count DESC LIMIT N.*

### Summary
Classic SQL reporting aggregation with grouping and distinct counts, applicable to many transaction summary/analytics problems.

### Tags
Database(#database)

### Similar Problems
