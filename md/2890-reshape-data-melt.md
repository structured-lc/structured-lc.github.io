### Leetcode 2890 (Easy): Reshape Data: Melt [Practice](https://leetcode.com/problems/reshape-data-melt)

### Description  
Given a table with sales data in a **wide format**, where each product has its sales for several quarters in separate columns (such as `quarter_1`, `quarter_2`, etc.), **reshape the data to a long format**.  
Each row in the output should have three columns: `product`, `quarter`, and `sales`, corresponding to a single sales record for a product and quarter.  
The input is a pandas DataFrame called `report`, and you have to implement a function that returns the reshaped DataFrame.

### Examples  

**Example 1:**  
Input:  
```python
report =
[
    ["Umbrella", 100, 120, 150, 130],
    ["Raincoat", 200, 220, 250, 230]
]
columns = ["product", "quarter_1", "quarter_2", "quarter_3", "quarter_4"]
```
Output:  
```python
[
    ["Umbrella", "quarter_1", 100],
    ["Umbrella", "quarter_2", 120],
    ["Umbrella", "quarter_3", 150],
    ["Umbrella", "quarter_4", 130],
    ["Raincoat", "quarter_1", 200],
    ["Raincoat", "quarter_2", 220],
    ["Raincoat", "quarter_3", 250],
    ["Raincoat", "quarter_4", 230]
]
columns = ["product", "quarter", "sales"]
```
*Explanation: Each quarter column is transformed into a row for each product, with its associated sales value.*

**Example 2:**  
Input:  
```python
report =
[
    ["A", 10, 20],
    ["B", 30, 40]
]
columns = ["product", "quarter_1", "quarter_2"]
```
Output:  
```python
[
    ["A", "quarter_1", 10],
    ["A", "quarter_2", 20],
    ["B", "quarter_1", 30],
    ["B", "quarter_2", 40]
]
```
*Explanation: We have two products and two quarters. Each quarter value becomes a separate row.*

**Example 3:**  
Input:  
```python
report =
[
    ["Widget", 0],
]
columns = ["product", "quarter_1"]
```
Output:  
```python
[
    ["Widget", "quarter_1", 0]
]
```
*Explanation: Single product and single quarter, so just one row in the output.*

### Thought Process (as if you’re the interviewee)  
- The task is similar to the "melt" operation in pandas, where you reshape a dataframe from wide to long format.
- Brute force approach: For each row, iterate over each "quarter_x" column, and for each, create a new row in the output DataFrame with `product`, `quarter`, and `sales`.
- This involves nested loops: one for rows⁠—one for each quarter column.
- However, pandas allows an efficient solution using `pd.melt`, which is optimized for this operation.
- With pandas:
  - Use `pd.melt` on the input DataFrame, setting `id_vars=['product']` so product remains fixed.
  - The `var_name` can be set to "quarter", and `value_name` to "sales" for the new columns.
- This approach is robust, concise, and takes advantage of pandas' optimized implementation.  
- No extra data structures or manual looping required.

### Corner cases to consider  
- Empty input DataFrame
- A product has missing sales for a quarter (NaN values)
- Only one product
- Only one quarter column
- Column names not exactly matching "quarter_\*" pattern (assumed fixed for this problem)
- All sales are zero or negative  
- Large numbers of products or quarters (should scale cleanly)

### Solution

```python
# Accepts a pandas DataFrame `report` as input.
# Transforms from wide format (one row per product, sales in columns)
# to long format (one row per product per quarter).

import pandas as pd

def meltTable(report: pd.DataFrame) -> pd.DataFrame:
    # Use pandas melt to unpivot the quarterly columns into rows.
    # 'product' is the id column, variable columns become 'quarter', values as 'sales'
    return pd.melt(
        report,
        id_vars=['product'],
        var_name='quarter',
        value_name='sales'
    )
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n), where m = # of products (rows), n = # of quarters (columns besides 'product').  
  - Every value in the quarter columns is processed once.
- **Space Complexity:** O(m × n), since the output DataFrame has m × n rows (one per product and quarter).

### Potential follow-up questions (as if you’re the interviewer)  

- What if column names change or are not consistently “quarter_1”, “quarter_2”, ...?
  *Hint: How would you dynamically select the columns to melt?*

- Can you maintain a custom ordering of quarters if the columns are out of order?
  *Hint: How can you sort or specify column order before/after melting?*

- How would you handle missing data (NaN sales) gracefully?
  *Hint: Should they be dropped, kept as-is, or filled with default?*

### Summary
This problem showcases the **wide-to-long dataframe transformation** pattern, essential in data analysis and common in ETL pipelines. Using pandas' `melt()` is an optimal, readable way to achieve this in Python. The same reshaping pattern is widely used in data cleaning, feature engineering, and reporting tasks.