### Leetcode 620 (Easy): Not Boring Movies [Practice](https://leetcode.com/problems/not-boring-movies)

### Description  
Given a list of movies, each with an `id`, `movie` title, `description`, and `rating`, return only the movies that:
- do **not** have the description `"boring"`,
- have an **odd** `id` (i.e., id % 2 == 1),
- and are **sorted by rating in descending order**.

You need to filter and order the rows accordingly, returning all columns for the matching movies.

### Examples  

**Example 1:**  
Input: `[ [1, "War", "great", 8.9], [2, "Boring Tale", "boring", 7.5], [3, "Star", "boring", 8.6], [5, "House Card", "interesting", 9.1] ]`  
Output: `[ [5, "House Card", "interesting", 9.1], [1, "War", "great", 8.9] ]`  
*Explanation: Only movies with odd ids (1, 3, 5) and description not "boring" (so, exclude id 3), then sorted: 5 (9.1), 1 (8.9).*

**Example 2:**  
Input: `[ [1, "Good Movie", "awesome", 8.5] ]`  
Output: `[ [1, "Good Movie", "awesome", 8.5] ]`  
*Explanation: The only movie is not "boring" and has an odd id, so included.*

**Example 3:**  
Input: `[ [2, "Dull Flick", "boring", 6.5], [4, "Meh", "great", 7.0] ]`  
Output: `[]`  
*Explanation: No odd ids and none meet the criteria, so output is empty.*

### Thought Process (as if you’re the interviewee)  
First, I’d want to filter out all movies where the `description` is `"boring"`. Next, I’d select only those movies where the `id` is odd (id % 2 == 1). Finally, I’d sort the remaining records by `rating` from highest to lowest.  
A brute-force approach would be to iterate through each record, check the criteria, put the qualified ones into a new list, then sort that list by the `rating` field.  
This two-step process (filter, then sort) is easy to implement and efficient for the dataset sizes typically given in interview questions.

### Corner cases to consider  
- No movies matching either filter (should return an empty list)
- All movies have "boring" as description, or all have even ids
- Multiple movies have the same rating (confirm stable sorting)
- Single movie in input (handles oddness and description)
- Empty input list

### Solution

```python
def not_boring_movies(cinema):
    # Step 1: Filter out records with description "boring" and even ids
    filtered = []
    for record in cinema:
        movie_id, title, desc, rating = record
        # Keep only if id is odd and description is not "boring"
        if movie_id % 2 == 1 and desc != "boring":
            filtered.append(record)
    # Step 2: Sort the filtered list by rating, descending
    filtered.sort(key=lambda x: x[3], reverse=True)
    return filtered
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  n for filtering, and log n for sorting the filtered list (worst case, size n).
- **Space Complexity:** O(n)  
  We create a new list for filtered results (could be up to n size if all qualify).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your code change if the data were in a huge file or database, not memory?  
  *Hint: Discuss streaming/SQL or generator approaches.*

- Can you do this with a single pass and in-place modification?  
  *Hint: Think about which built-in functions or data structures help avoid extra memory.*

- How would you handle ties in rating (movies with same rating)?  
  *Hint: Add secondary sorting keys, such as `id` ascending.*

### Summary
This problem demonstrates **filtering** and **sorting** of structured data—classic steps in data-processing or SQL tasks. The approach is direct: filter to exclude the unwanted rows, sort the survivors, then output. This same coding pattern applies to numerous “find and order” problems where you need to select based on multiple conditions.