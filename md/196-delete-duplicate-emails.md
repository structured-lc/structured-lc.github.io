### Leetcode 196 (Easy): Delete Duplicate Emails [Practice](https://leetcode.com/problems/delete-duplicate-emails)

### Description  
Given a table `Person` with columns `id` (unique integer for each person) and `email` (string), you need to ensure **no duplicate emails exist** in the table.  
If the same email appears more than once, **keep only the record with the smallest id** and delete the rest.  
Your solution should modify the table in place.

### Examples  

**Example 1:**  
Input:  
```
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
```
Output:  
```
Person table after deletion:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
```
*Explanation: `john@example.com` appeared twice (id=1, id=3). Keep the lowest id (id=1) and delete the other.*

**Example 2:**  
Input:  
```
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | alice@a.com      |
| 2  | alice@a.com      |
| 3  | alice@a.com      |
+----+------------------+
```
Output:  
```
Person table after deletion:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | alice@a.com      |
+----+------------------+
```
*Explanation: All ids have the same email; only the record with the smallest id (id=1) remains.*

**Example 3:**  
Input:  
```
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | dave@example.com |
| 2  | eve@example.com  |
| 3  | frank@example.com|
+----+------------------+
```
Output:  
```
Person table after deletion:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | dave@example.com |
| 2  | eve@example.com  |
| 3  | frank@example.com|
+----+------------------+
```
*Explanation: All emails are unique. No deletions needed.*

### Thought Process (as if you’re the interviewee)  
- **First step:**  
  - Identify all emails that appear **more than once**.
  - For each duplicate, **keep** only the record with the *smallest* id.
- **Brute-force (inefficient):**  
  - Loop through the table for each row, keep track of emails seen so far.  
  - If a duplicate is found and id is not the smallest for that email, delete it.
  - Not efficient for large datasets due to O(N²) time for repeated scanning.
- **Optimized (typical in SQL):**  
  - Use a self-join or subquery, identifying duplicate emails where the id is **not minimal**.
  - Delete those rows directly in SQL (`DELETE p1 FROM Person p1, Person p2 WHERE p1.email = p2.email AND p1.id > p2.id`), ensuring only the smallest-id record for each email survives.
- **Why this approach:**  
  - Single statement.
  - Efficient, only O(N) for lookup and deletion with suitable indexing.
  - Modifies the table in place (as required by problem).

### Corner cases to consider  
- Table is already unique (no duplicate emails).
- Multiple duplicates for a single email, all ids out of order.
- Table is empty.
- All rows have the same email.
- Only one row in table.

### Solution

```python
# SQL question, but showing Python table operation for understanding.
# But in real LeetCode, you'd write SQL like:
# DELETE p1 FROM Person p1, Person p2 WHERE p1.email = p2.email AND p1.id > p2.id;

def delete_duplicate_emails(persons):
    # persons: list of dicts, e.g., [{'id': 1, 'email': 'a@a.com'}, ...]
    # Goal: Remove all but the smallest id for each unique email
    
    # Step 1: Find the minimum id for each email
    email_to_min_id = {}
    for row in persons:
        email = row["email"]
        if email not in email_to_min_id or row["id"] < email_to_min_id[email]:
            email_to_min_id[email] = row["id"]
    
    # Step 2: Only keep rows with id == min id for that email
    result = []
    seen_emails = set()
    for row in persons:
        email = row["email"]
        if row["id"] == email_to_min_id[email] and email not in seen_emails:
            result.append(row)
            seen_emails.add(email)
    return result

# For demonstration only. LeetCode expects an SQL statement.
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of rows.  
  - The algorithm scans the table twice: first to find min id per email, second to filter the rows.
- **Space Complexity:** O(E), where E is the number of unique emails.  
  - Used to store `email_to_min_id` map and a set for seen emails (auxiliary storage for deduplication).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the table was very large and couldn’t fit into memory?  
  *Hint: Consider processing data in batches or indexing.*

- How would you ensure data consistency if this table is being updated concurrently?  
  *Hint: Think about SQL transactions and locking.*

- Could this be solved in a single SQL line without subqueries?  
  *Hint: Self JOIN and identify rows to delete using id comparison.*

### Summary
This problem uses a **deduplication by key with min/max rule** pattern, often found in SQL or set-related problems.  
The pattern is universal: keep only one "representative" per group, usually by comparing other columns (smallest/largest id, date, etc).  
It's common in data cleansing, log processing, and database normalization.  
In interviews, showing both a brute-force and an optimized (JOIN/subquery) approach is valued.


### Flashcard
For each duplicate email, delete all but the record with the smallest id.

### Tags
Database(#database)

### Similar Problems
