### Leetcode 1148 (Easy): Article Views I [Practice](https://leetcode.com/problems/article-views-i)

### Description  
You are given a table called `Views` containing one or more records for each article view. Each row stores the following columns:  
- **article_id**: The unique id for an article  
- **author_id**: The id of the person who authored the article  
- **viewer_id**: The id of the user who viewed the article  
- **view_date**: The date when the view happened  

Your task is to find all the authors who have viewed at least one of **their own articles** (i.e., the `author_id` and `viewer_id` are the same for at least one record). Return a table with a single column, **id** (the author's id), in ascending order.

### Examples  

**Example 1:**  
Input:  
`Views` table:
```
| article_id | author_id | viewer_id | view_date  |
|------------|-----------|-----------|------------|
|     1      |     3     |     5     | 2019-08-01 |
|     1      |     3     |     6     | 2019-08-02 |
|     2      |     7     |     7     | 2019-08-01 |
|     2      |     7     |     6     | 2019-08-02 |
|     4      |     4     |     4     | 2019-08-01 |
|     5      |     4     |     5     | 2019-08-02 |
```
Output:  
```
| id |
|----|
| 4  |
| 7  |
```
*Explanation: Authors with id 4 and 7 have at least one view record where they themselves viewed their own article (author_id = viewer_id). Output ids sorted ascending.*

**Example 2:**  
Input:  
`Views` table:
```
| article_id | author_id | viewer_id | view_date  |
|------------|-----------|-----------|------------|
|     8      |     2     |     3     | 2020-01-01 |
|     9      |     2     |     2     | 2020-01-02 |
```
Output:  
```
| id |
|----|
| 2  |
```
*Explanation: Author with id=2 viewed their own article once (author_id = viewer_id for article_id 9).*

**Example 3:**  
Input:  
`Views` table:
```
| article_id | author_id | viewer_id | view_date  |
|------------|-----------|-----------|------------|
|     7      |     3     |     6     | 2022-01-01 |
|     8      |     1     |     2     | 2022-01-01 |
```
Output:  
```
| id |
|----|
```
*Explanation: Nobody viewed their own article, so output is an empty table.*

### Thought Process (as if you’re the interviewee)  
First, I need to find all the records where the author_id is the same as the viewer_id — that means the author viewed their own article. The problem is focused on these cases only; for each such row, I want the author_id in the output.

The brute-force idea:  
- Go through each record, and for any record where author_id == viewer_id, add author_id to a result set (as a unique value).

Since the result should give each author only once (even if they self-viewed multiple times), I will use a set to avoid duplicates.

Optimize:  
- We only need to scan the table once.
- Use a set/dictionary for uniqueness.
- Return the author ids sorted.

In SQL, the solution is straightforward:  
- SELECT author_id FROM Views WHERE author_id = viewer_id  
- Use DISTINCT to get each author once  
- ORDER BY author_id

Trade-offs:  
- This approach is efficient since we only filter by a condition and collect unique ids; indexing on author_id/viewer_id could make it faster on a large dataset.

### Corner cases to consider  
- No records where author_id = viewer_id → should return an empty result
- An author self-views multiple times → only one occurrence in output
- Multiple authors self-viewing → all unique author ids in sorted order
- Table is empty → returns empty result
- IDs are not consecutive or ordered → must still sort the result

### Solution

```python
# Since this is a SQL-centric question, here's the raw logic in Python for clarity.
# Let's simulate the logic for a table as a list of dictionaries.

def find_authors_self_view(views):
    # Use a set to collect author ids who viewed their own article
    author_ids = set()
    for row in views:
        # Check if author_id equals viewer_id
        if row['author_id'] == row['viewer_id']:
            author_ids.add(row['author_id'])
    # Return sorted list of unique author ids
    return sorted(author_ids)

# Example usage:
views = [
    {"article_id": 1, "author_id": 3, "viewer_id": 5, "view_date": "2019-08-01"},
    {"article_id": 1, "author_id": 3, "viewer_id": 6, "view_date": "2019-08-02"},
    {"article_id": 2, "author_id": 7, "viewer_id": 7, "view_date": "2019-08-01"},
    {"article_id": 2, "author_id": 7, "viewer_id": 6, "view_date": "2019-08-02"},
    {"article_id": 4, "author_id": 4, "viewer_id": 4, "view_date": "2019-08-01"},
    {"article_id": 5, "author_id": 4, "viewer_id": 5, "view_date": "2019-08-02"},
]
print(find_authors_self_view(views))  # Output: [4, 7]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — where n is the number of rows in the table. We check each record once.
- **Space Complexity:** O(k) — where k is the number of unique authors who self-viewed. Used for the set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to know how many times each author viewed their own articles?  
  *Hint: Use a counting mechanism or GROUP BY in SQL.*

- How would you extend this to return the article titles for self-views?  
  *Hint: SELECT DISTINCT author_id, article_id, article_title WHERE author_id = viewer_id.*

- How would you include only views from a particular date range (e.g., last month)?  
  *Hint: Add a condition on view_date with WHERE clause or filter in Python logic.*

### Summary
This is a classic filtering and deduplication problem (“Find unique items matching a property”), common in database and analytics work. It relies on the filter–project–deduplicate pattern, which appears in problems involving logs, traces, access records, audits, etc. Variants include counting unique events, summing values per entity, or finding distinct values meeting certain conditions.