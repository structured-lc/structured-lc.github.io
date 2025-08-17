### Leetcode 3642 (Easy): Find Books with Polarized Opinions [Practice](https://leetcode.com/problems/find-books-with-polarized-opinions)

### Description  
Given tables for `Books` and `Reading_Sessions`, we are to find all books that have **polarized opinions**—meaning, books that have received both very high ratings and very low ratings from different readers. Specifically, a book must:
- Have at least 5 ratings.
- Have at least one rating ≤ 2.
- Have at least one rating ≥ 4.

We need to output the `book_id` and `title` for all books that fulfill these requirements.

### Examples  

**Example 1:**  
Input:  
Books =  
| book_id | title         |  
|---------|--------------|  
| 1       | Algorithms   |  
| 2       | DB Systems   |  

Reading_Sessions =  
| session_id | book_id | user_id | rating |  
|------------|---------|---------|--------|  
| 101        | 1       | 201     | 1      |  
| 102        | 1       | 202     | 2      |  
| 103        | 1       | 203     | 5      |  
| 104        | 1       | 204     | 4      |  
| 105        | 1       | 205     | 4      |  
| 106        | 2       | 201     | 3      |  
| 107        | 2       | 206     | 4      |  
| 108        | 2       | 207     | 2      |  
| 109        | 2       | 208     | 3      |  
| 110        | 2       | 209     | 3      |  

Output:  
| book_id | title       |  
|---------|------------|  
| 1       | Algorithms |  

*Explanation: Book 1 ("Algorithms") has 5 ratings, at least one rating ≤ 2 (1, 2), and at least one rating ≥ 4 (4, 5, 4). Book 2 does not qualify (no rating ≥ 4 and ≤ 2 for 5 ratings).*

**Example 2:**  
Input:  
Books =  
| book_id | title      |  
|---------|-----------|  
| 5       | Art       |  
| 6       | History   |  

Reading_Sessions =  
| session_id | book_id | user_id | rating |  
|------------|---------|---------|--------|  
| 201        | 5       | 301     | 1      |  
| 202        | 5       | 302     | 3      |  
| 203        | 5       | 303     | 4      |  
| 204        | 5       | 304     | 5      |  
| 205        | 5       | 305     | 2      |  
| 206        | 6       | 306     | 4      |  
| 207        | 6       | 307     | 4      |  
| 208        | 6       | 308     | 4      |  
| 209        | 6       | 309     | 4      |  
| 210        | 6       | 310     | 4      |  

Output:  
| book_id | title   |  
|---------|---------|  
| 5       | Art     |  

*Explanation: Book 5 has 5 ratings (1, 3, 4, 5, 2), at least one ≤ 2 (1, 2), and at least one ≥ 4 (4, 5). Book 6 has all ratings ≥ 4, but no rating ≤ 2.*

**Example 3:**  
Input:  
Books =  
| book_id | title      |  
|---------|-----------|  
| 11      | Fantasy    |  

Reading_Sessions =  
| session_id | book_id | user_id | rating |  
|------------|---------|---------|--------|  
| 401        | 11      | 501     | 3      |  
| 402        | 11      | 502     | 3      |  
| 403        | 11      | 503     | 3      |  
| 404        | 11      | 504     | 3      |  
| 405        | 11      | 505     | 3      |  

Output:  
| book_id | title    |  
|---------|----------|  

*Explanation: "Fantasy" has 5 ratings, but all of them are 3, so there is no very low (≤2) and no very high (≥4) ratings. Output is empty.*

### Thought Process (as if you’re the interviewee)  

First, I check what info is involved. We have a `Books` table and a `Reading_Sessions` table with `rating`. For each book, we want to see if:
- The number of ratings is at least 5.
- There is at least one very low (≤2) and one very high (≥4) rating.

A brute-force approach is:
- For each book, scan all sessions, collect ratings into a list.
- Count how many ratings, check for the presence of rating ≤2 and ≥4.

But this is inefficient for large data.

Optimized approach:
- Use a SQL `GROUP BY` aggregate:
    - For each book, count ratings, find min(rating), and max(rating).
    - Check: count ≥ 5, min ≤ 2, max ≥ 4.
- Then join with Books on `book_id`.

This approach is O(N), memory-efficient, and easy to do in one SQL or, if in Python, using dictionaries.

Why? The aggregation reduces repeated work versus entrywise filter. No trade-off except if session data is enormous (then a streaming/grouped approach would be best).

### Corner cases to consider  
- Book gets exactly 5 ratings; just passing the threshold is allowed.
- A book has lots of ratings, but all are in the middle (all 3s)—don't include.
- Book has only low ratings or only high ratings, but not both—don't include.
- Empty table—return empty output.
- A book not present in Reading_Sessions—don’t include.
- Multiple books with identical stats; all should be returned.
- Duplicate ratings by the same user for a book—should be counted as separate ratings.

### Solution

```python
def find_polarized_books(books, reading_sessions):
    # Step 1: Group all ratings by book_id
    from collections import defaultdict

    ratings = defaultdict(list)
    for session in reading_sessions:
        # session: [session_id, book_id, user_id, rating]
        b_id = session[1]
        r = session[3]
        ratings[b_id].append(r)
    
    result = []
    for book in books:
        b_id = book[0]
        title = book[1]
        if b_id not in ratings:
            continue
        rating_list = ratings[b_id]
        # At least 5 ratings
        if len(rating_list) < 5:
            continue
        # At least one rating ≤ 2
        has_low = any(r <= 2 for r in rating_list)
        # At least one rating ≥ 4
        has_high = any(r >= 4 for r in rating_list)
        if has_low and has_high:
            result.append([b_id, title])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + N), where M is the number of reading sessions and N is the number of books. Each reading session is processed once, and each book is checked once.
- **Space Complexity:** O(M), for storing ratings grouped per book.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you return extra statistics, such as the min/max rating or average rating, per polarized book?  
  *Hint: Use aggregation; add results to output list.*

- How would you efficiently process this if the input is millions of records and cannot fit in memory?  
  *Hint: Use streaming/grouped processing, maybe SQL or disk-based approaches.*

- Can you write an equivalent SQL query for this problem?  
  *Hint: Use GROUP BY book_id, HAVING COUNT(…) ≥ 5 and MIN(rating) ≤ 2 and MAX(rating) ≥ 4.*

### Summary
This approach uses the **group-by pattern**, commonly applied in database problems to aggregate facts per entity, here applied in Python using dictionaries.  
Key takeaways: Reduce to aggregates, then apply thresholds; do not scan all ratings separately for each book. This coding/data pattern is widely used in analytics and reporting scenarios.