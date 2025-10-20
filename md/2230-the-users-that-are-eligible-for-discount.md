### Leetcode 2230 (Easy): The Users That Are Eligible for Discount [Practice](https://leetcode.com/problems/the-users-that-are-eligible-for-discount/)

### Description  
Given a table of user purchase data, you need to identify which users are eligible for a discount.  
A user is **eligible** for a discount if:
- They had at least one purchase:
    - In the **inclusive time interval** `[startDate, endDate]`
    - With amount **≥ minAmount**  
The query should return the `user_id` of all eligible users.

Both `startDate` and `endDate` refer to the beginning of their date (i.e., time as `YYYY-MM-DD 00:00:00`).  

### Examples  

**Example 1:**  
Input:  
Purchases table:
```
+---------+------------+---------+
| user_id | time_stamp | amount  |
+---------+------------+---------+
|    1    |2022-03-01  |   120   |
|    2    |2022-03-03  |    90   |
|    1    |2022-03-07  |   200   |
|    3    |2022-03-05  |   120   |
|    2    |2022-03-04  |   105   |
+---------+------------+---------+
```
startDate=`2022-03-01`, endDate=`2022-03-05`, minAmount=`100`  

Output:  
`[1,3]`  

*Explanation:*
- User 1: Purchase of 120 on 2022-03-01 (meets all conditions).
- User 3: Purchase of 120 on 2022-03-05 (within interval and meets amount).
- User 2: Purchases of 90 (too low) and 105 (on 2022-03-04, so eligible for amount, but see both dates. The eligible is on 2022-03-04).
*If 2's 105 meets amount within range, 2 is included. Otherwise, only [1,3].*

**Example 2:**  
Input:  
Purchases table:
```
+---------+------------+---------+
| user_id | time_stamp | amount  |
+---------+------------+---------+
|    4    |2022-04-10  |   80    |
|    4    |2022-04-11  |   200   |
|    5    |2022-04-09  |   120   |
+---------+------------+---------+
```
startDate=`2022-04-10`, endDate=`2022-04-11`, minAmount=`100`  

Output:  
`[4]`  

*Explanation:*
- User 4: Purchase on 2022-04-11 is 200 (eligible: in range and ≥100).
- User 5: Only purchase is before startDate.

**Example 3:**  
Input:  
Purchases table:
```
+---------+------------+---------+
| user_id | time_stamp | amount  |
+---------+------------+---------+
|   10    |2021-09-07  |  500    |
+---------+------------+---------+
```
startDate=`2021-09-01`, endDate=`2021-09-10`, minAmount=`650`  

Output:  
`[]`  

*Explanation:*  
- User 10: Only purchase is in time range but amount too low (500 < 650). So, output is an empty list.

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each user and each purchase, check if its timestamp is between startDate and endDate and amount ≥ minAmount. If so, record that user as eligible.  
  Can be achieved via:
    - Store users in a set when a matching purchase is found.
    - The rest can be skipped for efficiency.

- **Why set?**  
  - A user might have multiple purchases, but we only need unique eligible users.
  - Set gives O(1) inserts and prevents duplicates.

- **Trade-offs:**  
  - This simple scan is efficient for relatively small or moderate-size input.
  - For massive data in production, an index on the time or queries in chunks could be required.

- **Why not use built-in SQL?**  
  - In interview context, asked to reason it out programmatically.
  - Solution must avoid libraries not allowed in interviews.

### Corner cases to consider  
- No purchases at all (empty input).
- No purchases within the time range.
- Purchases within range but none meet the minAmount.
- Purchases that just hit the minAmount.
- Multiple qualifying purchases for one user.
- One user with qualifying and non-qualifying purchases.
- All users in table are eligible (testing full positive).
- `startDate` == `endDate`.
- `minAmount` is zero.

### Solution

```python
def eligible_users(purchases, startDate, endDate, minAmount):
    # purchases: List of dicts [{'user_id':..., 'time_stamp':..., 'amount':...}, ...]
    # startDate, endDate: "YYYY-MM-DD" strings
    # minAmount: int
    
    eligible = set()
    
    # Loop over every purchase
    for row in purchases:
        user = row['user_id']
        date = row['time_stamp']
        amt = row['amount']
        
        # Check if the date is within [startDate, endDate] inclusive
        if startDate <= date <= endDate:
            # And if amount meets the requirement
            if amt >= minAmount:
                eligible.add(user)
    
    # Return as sorted list for deterministic output
    return sorted(eligible)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of purchases.  
  Every purchase is visited once and each eligible user_id is added to a set (O(1) per op).
- **Space Complexity:** O(u), where u is the number of unique user_ids that are eligible.  
  Only user_ids of matching purchases are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code if the purchase data was too large to fit in memory?  
  *Hint: Streaming or batch processing, or process by date windows, or use database queries.*

- How to handle time zones or "end of day" nuances for timestamps?  
  *Hint: Pay attention to storing timestamps as UTC, or use datetime functions to normalize.*

- What if we need to return not just user_id, but which purchases made them eligible?  
  *Hint: Collect user_id with purchase info, not just user_id.*

### Summary
This problem is a straightforward **scan/filter** and **deduplication** using a set.  
It is a common pattern in data filtering or eligibility style questions, and can be adapted for more involved queries like finding users with repeated behavior, windowed event eligibility, or joining two filter criteria.  
This approach is efficient for reasonably sized datasets, and the basic logic applies to many data filtering scenarios.


### Flashcard
Use a set to collect users with qualifying purchases between start and end dates.

### Tags
Database(#database)

### Similar Problems
- The Number of Users That Are Eligible for Discount(the-number-of-users-that-are-eligible-for-discount) (Easy)