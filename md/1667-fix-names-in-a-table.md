### Leetcode 1667 (Easy): Fix Names in a Table [Practice](https://leetcode.com/problems/fix-names-in-a-table)

### Description  
You are given a table `Users` with columns `user_id` and `name`. The `name` column may have random casing (e.g., some characters uppercase, some lowercase). You need to write a SQL query to transform each name so that only the first letter is uppercase and the rest are lowercase (capitalize the name). Return the results ordered by `user_id`.

### Examples  

**Example 1:**  
Input: `Users = [[1, "aLiS"], [2, "BOB"], [3, "johnNY"]]`  
Output: `[[1, "Alis"], [2, "Bob"], [3, "Johnny"]]`  
*Explanation: Each name is reformatted so first letter is uppercase, rest are lowercase.*

**Example 2:**  
Input: `Users = [[10, "mARY"], [12, "sAM"]]`  
Output: `[[10, "Mary"], [12, "Sam"]]`  
*Explanation: Each name is properly capitalized.*

**Example 3:**  
Input: `Users = [[5, "z"], [7, "Z"]]`  
Output: `[[5, "Z"], [7, "Z"]]`  
*Explanation: Single-letter names are always uppercase.*


### Thought Process (as if you’re the interviewee)  
- The goal: make only the first character uppercase and the rest lowercase.
- Brute-force: Split name into first char and rest, apply UPPER to first, LOWER to rest, concatenate.
- SQL provides string functions: UPPER, LOWER, SUBSTRING or SUBSTR/LEFT/RIGHT depending on the SQL flavor.
- Final approach:
  - SELECT user_id
  - Use CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name
  - ORDER BY user_id
- If name has just one character, SUBSTRING(name, 2) returns empty, which works fine.
- This works for any mix of upper/lowercase letters in any position.


### Corner cases to consider  
- Name is a single letter (e.g., "a" or "Z").
- Empty name string (might not exist in constraints, but good to consider).
- Already well-formatted name (e.g., "Mary").
- Collision in output after formatting (e.g., two users with names formatted to the same string).


### Solution

```sql
SELECT user_id,
       CONCAT(UPPER(SUBSTRING(name, 1, 1)), LOWER(SUBSTRING(name, 2))) AS name
FROM Users
ORDER BY user_id;
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Users table. Each row takes constant time to process with string functions.
- **Space Complexity:** O(n), as the result table has one output row per input row (besides output buffer, SQL doesn't use extra space).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle names with multiple words (e.g., "john smith")?
  *Hint: Look into splitting and capitalizing each word separately.*

- What if names may include symbols or non-alphabetic characters?
  *Hint: Should those be affected by case changes or left untouched?*

- How would you implement this as a bulk update to modify the underlying table, not just as a SELECT?  
  *Hint: Use UPDATE and set the new name value. Consider atomicity if multiple queries run in parallel.*

### Summary
This problem uses core SQL string manipulation: splitting a string, modifying character case, and combining results. The pattern applies to general string normalization tasks, e.g., cleaning up raw user data, standardizing input for search, or preparing names for display. Functions like UPPER, LOWER, SUBSTRING, CONCAT are essential in SQL data cleansing.


### Flashcard
Use SQL string functions to uppercase the first letter and lowercase the rest for each name.

### Tags
Database(#database)

### Similar Problems
