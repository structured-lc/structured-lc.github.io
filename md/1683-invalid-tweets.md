### Leetcode 1683 (Easy): Invalid Tweets [Practice](https://leetcode.com/problems/invalid-tweets)

### Description  
Given a table `Tweets` with columns `tweet_id` (int, primary key) and `content` (varchar), identify invalid tweets. A tweet is **invalid** if its `content` has more than 15 characters (i.e., strictly > 15). Return the tweet IDs of all such invalid tweets. The result order does not matter.

### Examples  
**Example 1:**  
Input:  
Tweets table:
```
+----------+------------------------------+
| tweet_id | content                      |
+----------+------------------------------+
|   1      | Vote for Biden               |
|   2      | Let us make America great... |
+----------+------------------------------+
```
Output:  
```
+----------+
| tweet_id |
+----------+
|    2     |
+----------+
```
*Explanation: Tweet 1's content is 14 characters (valid); Tweet 2 is 32 characters (invalid).*  

**Example 2:**  
Input:  
Tweets table:
```
+----------+-----------------+
| tweet_id | content         |
+----------+-----------------+
|    1     | Hello World!    |
|    2     | Quick brown fox |
+----------+-----------------+
```
Output:  
```
+----------+
| tweet_id |
+----------+
+----------+
```
*Explanation: Both have ≤15 characters, so output is empty.*  

**Example 3:**  
Input:  
Tweets table:
```
+----------+----------------------------------+
| tweet_id | content                          |
+----------+----------------------------------+
|   1      | The rain in Spain stays mainly... |
|   2      | Short msg                        |
+----------+----------------------------------+
```
Output:  
```
+----------+
| tweet_id |
+----------+
|    1     |
+----------+
```
*Explanation: Tweet 1 has >15 characters (invalid).*

### Thought Process (as if you’re the interviewee)  
First, clarify that invalid tweets simply mean those whose content string length is greater than 15. This is a basic filtering problem. My plan is:
- Use the table `Tweets`.
- Filter rows where the character length of `content` is >15.
- Return `tweet_id`s for those rows.

The only tricky point is to use the right string length function depending on the SQL engine (e.g., `CHAR_LENGTH` for MySQL).

### Corner cases to consider  
- All tweets are valid (output should be empty).
- All tweets are invalid (output all tweet IDs).
- Tweet content with exactly 15 characters (should *not* be included).
- Tweet with empty or NULL content (NULL typically doesn’t pass >15, so not included).
- Non-ASCII characters (check if the character length function counts correctly.)

### Solution

```sql
SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Must scan every row in the table, where n is number of tweets.
- **Space Complexity:** O(1), not counting output; no extra space beyond storage for result set.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you include tweets with NULL content as invalid?  
  *Hint: Consider using IS NULL in your WHERE clause.*

- How can you get the count of invalid tweets instead of their IDs?  
  *Hint: Use COUNT instead of SELECT tweet_id.*

- Suppose tweet length must count bytes, not characters (multi-byte support). How would you change the query?  
  *Hint: Use LENGTH (bytes) instead of CHAR_LENGTH (characters) when relevant.*

### Summary
This problem uses the **basic SQL filtering pattern**, applying a condition to select specific rows. The important detail is string length handling, which may differ for characters vs. bytes, especially with Unicode. This query pattern is frequently used anywhere data needs to be filtered by string length, such as validation checks or formatting controls.

### Tags
Database(#database)

### Similar Problems
