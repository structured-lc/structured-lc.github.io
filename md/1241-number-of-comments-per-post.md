### Leetcode 1241 (Easy): Number of Comments per Post [Practice](https://leetcode.com/problems/number-of-comments-per-post)

### Description  
Given a `Submissions` table representing posts and comments in a forum, each row is either a post or a comment:
- Each submission has a `sub_id` and (optionally) a `parent_id`.
- If `parent_id` is `NULL`, the row is a post; otherwise, it's a comment, and its `parent_id` points to the post's `sub_id`.
- The table may have duplicate rows for posts or comments.
The task is: Return a table with each post’s `post_id` and the number of **unique comments** for that post. Treat duplicate posts/comments only once. Output must be sorted by `post_id` ascending.

### Examples  

**Example 1:**  
Input:  
Submissions =  
| sub_id | parent_id |
|--------|-----------|
| 1      | null      |
| 2      | 1         |
| 2      | 1         |
| 3      | 1         |
| 4      | null      |
Output:  
| post_id | number_of_comments |
|---------|-------------------|
| 1       | 2                 |
| 4       | 0                 |
*Explanation:*
- Both rows with (2,1) are the same comment and should only be counted once.  
- Post 1 has unique comments: 2 and 3 → count is 2.  
- Post 4 has no comments → count is 0.

**Example 2:**  
Input:  
Submissions =  
| sub_id | parent_id |
|--------|-----------|
| 10     | null      |
| 11     | 10        |
| 11     | 10        |
| 12     | 10        |
| 13     | 10        |
| 14     | null      |
| 14     | null      |
| 15     | 14        |
Output:  
| post_id | number_of_comments |
|---------|-------------------|
| 10      | 3                 |
| 14      | 1                 |
*Explanation:*
- For post 10: unique comments 11,12,13 → count 3.
- For post 14: unique comment 15 → count 1.

**Example 3:**  
Input:  
Submissions =  
| sub_id | parent_id |
|--------|-----------|
| 8      | null      |
| 8      | null      |
| 9      | 8         |
| 9      | 8         |
| 9      | 8         |
Output:  
| post_id | number_of_comments |
|---------|-------------------|
| 8       | 1                 |
*Explanation:*
- Multiple duplicate rows, but only one unique comment (9) for post 8.

### Thought Process (as if you’re the interviewee)  
First, I’ll identify all unique posts: rows where parent_id is null.  
Then, I need to count unique comments per post, treating comments as unique by (sub_id, parent_id).  
For each post, I’ll LEFT JOIN the comments table on parent_id = post’s sub_id.  
Count the number of unique comment sub_id values for each post.  
Finally, sort by post_id.

If we were implementing this in code for interview practice (assuming Python, but modeling SQL logic), I’d:
- Collect all rows, filter for unique posts, and unique (sub_id, parent_id) pairs.
- For each post, count the number of unique sub_id among comments whose parent_id equals post id.

This approach avoids double counting and handles duplicate data and posts.

### Corner cases to consider  
- Duplicate comments for the same post.
- Duplicate posts (same sub_id with parent_id null).
- Posts without any comments.
- Comments for non-existent posts (should not show in output as all posts must be in Submissions as a post).
- No submissions at all (empty input).
- Only comments, no posts.
- Only posts and no comments.

### Solution

```python
def number_of_comments_per_post(submissions):
    # Remove duplicate rows
    unique_rows = set((row['sub_id'], row['parent_id']) for row in submissions)
    
    # Get all unique posts (sub_id where parent_id is None)
    posts = set(sub_id for (sub_id, parent_id) in unique_rows if parent_id is None)
    
    # For each post, count unique comments (sub_id, parent_id = post_id)
    post_comments = {post_id: set() for post_id in posts}
    
    for (sub_id, parent_id) in unique_rows:
        if parent_id is not None and parent_id in posts:
            post_comments[parent_id].add(sub_id)
    
    # Prepare result: list of {post_id, number_of_comments} sorted by post_id
    result = []
    for post_id in sorted(posts):
        result.append({
            'post_id': post_id,
            'number_of_comments': len(post_comments[post_id])
        })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows. Building sets, iterating rows, and mapping posts/comments are O(n). Sorting posts is O(p log p) where p ≤ n.
- **Space Complexity:** O(n). We store unique rows, sets for posts, and mapping for post_comments.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach handle very large datasets?
  *Hint: Consider streaming or database solutions; discuss efficiency of set lookups.*

- How to extend this to show users with the most comments overall?
  *Hint: Track user_id if available; aggregate across posts.*

- What if comments can have replies (nested comments)?
  *Hint: Need to handle comment threads; discuss tree/recursive counting.*

### Summary
This problem uses the “group by/count distinct” pattern common in data processing and SQL. The key technique is deduplicating records by using sets. This pattern generalizes to log analysis, user statistics, and database query logic, and is a typical join/filter/count scenario.