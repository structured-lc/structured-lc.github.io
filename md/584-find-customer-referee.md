### Leetcode 584 (Easy): Find Customer Referee [Practice](https://leetcode.com/problems/find-customer-referee)

### Description  
Given a table `Customer` with columns:  
- `id` (customer id, unique, int)  
- `name` (customer name, string)  
- `referee_id` (id of who referred them, can be NULL or int)

Find the names of all customers whose referee is **not** the customer with id = 2.  
In other words, select all customers where `referee_id` is not 2 *or* is NULL (i.e., not referred by customer 2).

### Examples  

**Example 1:**  
Input:  
``` 
| id | name  | referee_id |
|----|-------|------------|
| 1  | Will  | NULL       |
| 2  | Jane  | NULL       |
| 3  | Alex  | 2          |
| 4  | Bill  | NULL       |
| 5  | Zack  | 1          |
| 6  | Mark  | 2          |
```
Output:  
```
| name |
|------|
| Will |
| Jane |
| Bill |
| Zack |
```
*Explanation: Customers Will, Jane, Bill (referee_id is NULL), and Zack (referee_id = 1) are either not referred by 2 or have no referee. Alex and Mark are both referred by customer 2, so they are excluded.*

**Example 2:**  
Input:  
``` 
| id | name  | referee_id |
|----|-------|------------|
| 1  | Alice | NULL       |
| 2  | Bob   | 3          |
| 3  | Carol | 2          |
| 4  | Dave  | NULL       |
```
Output:  
```
| name  |
|-------|
| Alice |
| Bob   |
| Dave  |
```
*Explanation: Alice and Dave have NULL referee_id, Bob’s referee is 3 (not 2), only Carol is excluded as her referee_id is 2.*

**Example 3:**  
Input:  
``` 
| id | name    | referee_id |
|----|---------|------------|
| 1  | Emma    | NULL       |
| 2  | Edward  | NULL       |
| 3  | Matilda | 1          |
| 4  | Susan   | 3          |
```
Output:  
```
| name    |
|---------|
| Emma    |
| Edward  |
| Matilda |
| Susan   |
```
*Explanation: No one has referee_id = 2, so all names are returned.*


### Thought Process (as if you’re the interviewee)  

The task is straightforward filtering.  
- **Brute-force**: For each customer, check if `referee_id` is explicitly 2—if it's not, include their name in the result.
- **Null handling**: Since `referee_id` can be NULL, direct comparison (`referee_id <> 2`) will ignore NULLs—so I must include `referee_id IS NULL` in the condition to catch customers with no referee.
- **Optimal solution**: Use a filter (WHERE clause in SQL, if in code: simple if-statement per record) including both cases: `referee_id IS NULL` or `referee_id != 2`.

This approach is optimal as it scans through all rows once and filters those who are not referred by 2.


### Corner cases to consider  
- Customer table is empty (no input data).
- All customers have `referee_id` = 2 (should return empty).
- All `referee_id` values are NULL.
- Mix of NULL and non-2 `referee_id` values.
- Only one customer in the table.
- Multiple customers with the same `referee_id` (other than 2).

### Solution

```python
def find_customer_referee(customers):
    # customers: list of dictionaries with keys 'id', 'name', 'referee_id'
    result = []
    for row in customers:
        # Include the current customer's name if their referee_id is NOT 2, or is NULL/None
        if row['referee_id'] is None or row['referee_id'] != 2:
            result.append(row['name'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since every customer row is checked once.
- **Space Complexity:** O(n), as the result list may store up to all customer names (if none were referred by 2).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to exclude referral from a list of banned referees, not just user id 2?  
  *Hint: Check if referee_id is in a banned set.*

- What if you wanted to return the full customer records, not just names?  
  *Hint: Adjust the logic to append row or construct dicts instead.*

- How would you handle this logic in a large streaming dataset or with millions of records?  
  *Hint: Discuss generator pattern, streaming filters, or database indexing.*

### Summary
This problem is a classic example of **filtering based on field criteria**, handling both standard and null values. The core pattern—filtering data with simple logical predicates—is widely applicable in data processing, SQL, and ETL tasks. Mastery of such filters is crucial for scalable, readable solutions in data engineering and backend development.

### Tags
Database(#database)

### Similar Problems
