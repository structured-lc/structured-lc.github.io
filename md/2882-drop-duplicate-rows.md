### Leetcode 2882 (Easy): Drop Duplicate Rows [Practice](https://leetcode.com/problems/drop-duplicate-rows)

### Description  
Given a DataFrame `customers` with columns including 'email', there might be multiple rows with the same email value (i.e., duplicate customers by email). Your task is to remove all duplicate rows based on the 'email' column, keeping only the **first occurrence** of each email, and return the resulting DataFrame.  
This is a common real-world scenario in data cleaning, where you want to deduplicate data based on a specific field.

### Examples  

**Example 1:**  
Input:  
```
customers = [
  [1, "Alice",    "alice@example.com"],
  [2, "Bob",      "bob@example.com"],
  [3, "AliceDup", "alice@example.com"]
]
```
Output:  
```
[
  [1, "Alice",   "alice@example.com"],
  [2, "Bob",     "bob@example.com"]
]
```
*Explanation: The second occurrence of the email "alice@example.com" is dropped, keeping only the first.*

**Example 2:**  
Input:  
```
customers = [
  [7, "Jane",   "jane@x.org"],
  [8, "John",   "john@x.org"],
  [9, "Jane2",  "jane@x.org"],
  [10, "Alice", "alice@abc.org"]
]
```
Output:  
```
[
  [7, "Jane",   "jane@x.org"],
  [8, "John",   "john@x.org"],
  [10, "Alice", "alice@abc.org"]
]
```
*Explanation: The second "jane@x.org" is dropped. All other emails are unique.*

**Example 3:**  
Input:  
```
customers = [
  [101, "Eric",   "eric@sample.com"]
]
```
Output:  
```
[
  [101, "Eric",   "eric@sample.com"]
]
```
*Explanation: Only one row -- no duplicates to remove.*

### Thought Process (as if you’re the interviewee)  

Brute-force idea:
- For each email, check if it has already appeared; if so, skip adding that row to the output.
- We could use a set to track seen emails and iterate through the DataFrame row by row.
- This would work, but if we're using pandas (typical in these SQL/DB DataFrame problems), `drop_duplicates(subset='email', keep='first')` is built for exactly this use case.  
- It is optimized and clear, and handles all the logic with a single call—this makes it the preferable solution if pandas is allowed.

Trade-offs:
- Manual looping is flexible and language-agnostic, but more error-prone and verbose.
- Built-in pandas function is efficient, concise, and readable, leveraging library optimizations.

### Corner cases to consider  
- DataFrame is empty: should return an empty DataFrame.
- Every row has a unique email: return all rows.
- All rows share the same email: keep only the first row.
- Rows with missing/null emails: typically, each null is considered a “duplicate” of itself; default `drop_duplicates` behavior keeps the first null, drops the rest.
- Email case-sensitivity: check if emails are considered the same only if case matches (default in pandas is case-sensitive).
- Additional unrelated columns (just ensure only 'email' is used for deduplication).

### Solution

```python
import pandas as pd

def dropDuplicateEmails(customers: pd.DataFrame) -> pd.DataFrame:
    # Remove duplicate rows based on the 'email' column, keeping only the first occurrence
    # The 'subset' parameter specifies which columns to consider for duplicates
    return customers.drop_duplicates(subset=['email'], keep='first')
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the DataFrame. Under the hood, pandas uses a hash table to identify the first occurrence for each unique email.
- **Space Complexity:** O(n), for storing the hash set used during deduplication, and for returning a potentially full DataFrame in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to keep the **last occurrence** of each email instead of the first?  
  *Hint: Check the `keep` parameter in `drop_duplicates`.*

- How would you remove duplicates based on **multiple columns**, not just email?  
  *Hint: Pass a list of column names to `subset`.*

- What if the DataFrame is extremely large and doesn't fit in memory?  
  *Hint: Consider chunking, streaming, or using a distributed data processing framework like Dask or Spark.*

### Summary
The approach leverages pandas' built-in `drop_duplicates` method, a common data-cleaning pattern for deduplication. This is highly efficient, readable, and standard for DataFrame operations in Python. The pattern recurs in many data preprocessing tasks in industry, especially when preparing datasets for machine learning, analytics, or reporting.

### Tags

### Similar Problems
