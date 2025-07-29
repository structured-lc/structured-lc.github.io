### Leetcode 2887 (Easy): Fill Missing Data [Practice](https://leetcode.com/problems/fill-missing-data)

### Description  
Given a DataFrame `products` with columns `name`, `quantity`, and `price`, fill all missing values (None or NaN) in the `quantity` column with 0. Return the updated DataFrame. The task is to ensure that the `quantity` field for every product never contains missing data.

### Examples  

**Example 1:**  
Input:  
products =  
| name            | quantity | price |
|-----------------|----------|-------|
| "Wristwatch"    | None     | 135   |
| "WirelessEarbuds"| None    | 821   |
| "GolfClubs"     | 779      | 9319  |
| "Printer"       | 849      | 3051  |

Output:  
| name            | quantity | price |
|-----------------|----------|-------|
| "Wristwatch"    | 0        | 135   |
| "WirelessEarbuds"| 0       | 821   |
| "GolfClubs"     | 779      | 9319  |
| "Printer"       | 849      | 3051  |

*Explanation: The `quantity` for "Wristwatch" and "WirelessEarbuds" is missing (None), so we set them to 0. Others are left unchanged.*

**Example 2:**  
Input:  
products =  
| name      | quantity | price |
|-----------|----------|-------|
| "jacket"  | None     | 50.0  |
| "shirt"   | 10       | 30.0  |
| "pants"   | None     | 40.0  |

Output:  
| name      | quantity | price |
|-----------|----------|-------|
| "jacket"  | 0        | 50.0  |
| "shirt"   | 10       | 30.0  |
| "pants"   | 0        | 40.0  |

*Explanation: Fill missing quantities for "jacket" and "pants" with 0. "shirt" is unchanged as quantity is present.*  

**Example 3:**  
Input:  
products =  
| name     | quantity | price |
|----------|----------|-------|
| "hat"    | None     | 5     |
| "scarf"  | None     | 12    |
| "gloves" | None     | 8     |

Output:  
| name     | quantity | price |
|----------|----------|-------|
| "hat"    | 0        | 5     |
| "scarf"  | 0        | 12    |
| "gloves" | 0        | 8     |

*Explanation: All `quantity` values are missing and thus replaced by 0 for every row.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force / General idea:**  
  The main requirement is to fill missing (`None` or `NaN`) values in the `quantity` column with 0. In a real-world setting, this is classic data cleaning, often performed before data analysis.
- **Direct approach:**  
  Iterate through every row, check if `quantity` is missing, and set it to 0 if so.  
  In the context of pandas and SQL-style DataFrames, this operation can be vectorized for better performance.
- **Optimal approach:**  
  Use pandas' `fillna()` method on the `quantity` column, filling missing values with 0 in one line.  
  This method is preferred because it is efficient, handles all missing value representations (`None`/`NaN`), and leverages internal pandas optimizations.
- **Trade-offs:**  
  This approach handles all missing types in that column, is readable, and is the standard for dataframes.  
  Other hacks (such as using loops) are less efficient and not idiomatic in pandas.

### Corner cases to consider  
- All values in `quantity` are missing.
- No missing values at all.
- Large amount of data (should still work efficiently).
- Only some rows have missing values.
- DataFrame is empty (no rows).
- There are negative or zero values in `quantity` (should only replace missing/NaN).

### Solution

```python
def fillMissingValues(products):
    # Fill missing values (None/NaN) in 'quantity' with 0
    products['quantity'] = products['quantity'].fillna(0)
    return products
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the DataFrame. fillna performs a pass through the specified columns.
- **Space Complexity:** O(1) extra space if done inplace (pandas stores result in the same DataFrame), otherwise O(n) if returned as a new object depending on method used internally.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to fill missing values in multiple columns, each with a different default?
  *Hint: The fillna method accepts a dict to handle this for each column.*

- What if you want to fill missing with the mean/median/mode instead of 0?
  *Hint: Use fillna with the computed value from products['quantity'].mean() or median().*

- How to fill only leading/trailing missing values but not ones surrounded by real numbers?
  *Hint: Look into fillna's 'method' parameter with 'ffill' or 'bfill'.*


### Summary
This is a classic **data cleaning** problem using pandas: *filling missing values in a column*. The solution uses the `fillna` method, which is efficient and highly readable, and is a pattern widely used in data preprocessing for machine learning, data analytics, and ETL pipelines. The concept generalizes well to feature engineering and is frequently relevant in various real-world, production-grade data tasks.