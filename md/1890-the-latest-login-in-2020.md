### Leetcode 1890 (Easy): The Latest Login in 2020 [Practice](https://leetcode.com/problems/the-latest-login-in-2020)

### Description  
Given a table Logins with columns user_id and time_stamp, find **the latest login time in 2020 for each user**.  
Only include users who actually logged in during 2020 (users with *no 2020 login* should be excluded).  
Return the result as a table with user_id and their latest 2020 login time as last_stamp.

### Examples  

**Example 1:**  
Input:  
Logins table:
```
user_id | time_stamp
--------|-------------------
6       | 2020-06-30 15:06:07
6       | 2019-10-01 13:55:43
8       | 2020-12-30 00:46:50
2       | 2020-01-16 02:49:50
2       | 2019-12-18 21:18:32
14      | 2019-07-14 08:09:13
8       | 2020-02-02 10:40:36
```
Output:  
```
user_id | last_stamp
--------|---------------------
6       | 2020-06-30 15:06:07
8       | 2020-12-30 00:46:50
2       | 2020-01-16 02:49:50
```
*Explanation:  
- User 6 logged in only once in 2020: returned as latest.  
- User 8 logged in twice in 2020: keep only the later login.  
- User 2: only 1 login in 2020.  
- User 14: no login in 2020 → excluded.*

**Example 2:**  
Input:  
Logins table:
```
user_id | time_stamp
--------|---------------------
1       | 2018-09-02 11:30:00
2       | 2020-03-05 22:10:00
1       | 2019-12-31 23:59:59
2       | 2020-05-20 10:15:23
1       | 2020-01-01 00:00:01
```
Output:  
```
user_id | last_stamp
--------|---------------------
2       | 2020-05-20 10:15:23
1       | 2020-01-01 00:00:01
```
*Explanation:  
- User 2's latest login in 2020 was in May.  
- User 1's only login in 2020 was Jan 1st.  
- Only logins in 2020 are considered.*

**Example 3:**  
Input:  
Logins table:
```
user_id | time_stamp
--------|---------------------
5       | 2019-05-10 09:23:10
7       | 2021-03-13 04:02:02
```
Output:  
(empty)
*Explanation: No users logged in during 2020.*

### Thought Process (as if you’re the interviewee)  
First, I want to filter to only logins that happened in the year 2020.  
Then, for each user, I need to find the **maximum (latest) time_stamp** from those 2020 logins.  
- Brute force for SQL: filter first, then use GROUP BY user_id with MAX(time_stamp).
- For each user_id, only return the *latest* time_stamp as last_stamp.

Tradeoffs:  
- If using BETWEEN for date filtering, be careful with the date boundaries (2020-01-01 to 2020-12-31 23:59:59).
- If using YEAR(time_stamp)=2020, it's more concise but might not use index if DB is strict.
- Grouping by user_id and aggregating is efficient and direct for the problem size.

### Corner cases to consider  
- Users without any logins in 2020: exclude from output.
- Users with multiple 2020 logins: only the latest is output.
- Multiple users with same latest timestamp: both should appear.
- All logins outside 2020: output is empty.
- Timestamps with boundary values: e.g. login at ‘2020-01-01 00:00:00’ and ‘2020-12-31 23:59:59’.
- Single row input.
- Empty table input.

### Solution

```sql
-- Report latest login for every user in 2020
SELECT
  user_id,
  MAX(time_stamp) AS last_stamp
FROM
  Logins
WHERE
  time_stamp BETWEEN '2020-01-01' AND '2020-12-31 23:59:59'
GROUP BY
  user_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of rows in Logins.  
  We scan all records, filter on time_stamp, then group and aggregate per user (usually much fewer than total rows).

- **Space Complexity:** O(U), where U = number of unique users who logged in during 2020 (for GROUP BY internal storage).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to find the *earliest* login for each user in 2020?
  *Hint: Change the aggregation function to MIN(time_stamp).*

- How would your query change if 2020 is not fixed (e.g. for any provided year)?
  *Hint: Add a parameter or use EXTRACT(YEAR FROM time_stamp) = :input_year.*

- How would you write this if the Logins table used separate date and time columns?
  *Hint: Combine columns or adjust WHERE filters accordingly.*

### Summary
This problem is a classic example of SQL grouping and aggregation—**filtering rows and finding the max (latest) per group** (user).  
This “filter+GROUP BY+aggregate” pattern is used frequently, such as for earliest/latest events, maximum scores, tallest building per city, etc.  
Efficient with index support on time_stamp/user_id and highly scalable for typical relational datasets.