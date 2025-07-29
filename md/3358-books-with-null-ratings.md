### Leetcode 3358 (Easy): Books with NULL Ratings [Practice](https://leetcode.com/problems/books-with-null-ratings)

### Description  
Given a table `Books` with columns for `book_id`, `title`, `author`, `published_year`, and `rating`, find all books **that do not have a rating** (`rating` is NULL).  
Return the result as a table containing only `book_id`, `title`, `author`, and `published_year`, ordered by `book_id` in ascending order.  
You can think of `NULL` as “unknown” or “missing” rating for some books—your goal is to fetch details of such books.

### Examples  

**Example 1:**  
Input:  
Books table:
| book_id | title           | author      | published_year | rating |
|---------|----------------|-------------|---------------|--------|
| 1       | Harry Potter   | J.K. Rowling| 1997          | 4.9    |
| 2       | The Hobbit     | J.R.R. Tolkien| 1937        | NULL   |
| 3       | The Road       | Cormac McCarthy | 2006      | NULL   |

Output:  
| book_id | title       | author         | published_year |
|---------|-------------|----------------|---------------|
| 2       | The Hobbit  | J.R.R. Tolkien | 1937          |
| 3       | The Road    | Cormac McCarthy| 2006          |

*Explanation: Both books with book_id 2 and 3 have ‘NULL’ ratings, so we select them with required columns.*

**Example 2:**  
Input:  
Books table:
| book_id | title        | author     | published_year | rating |
|---------|--------------|------------|---------------|--------|
| 4       | Dracula      | Bram Stoker| 1897          | 4.0    |
| 5       | Dune         | F. Herbert | 1965          | 4.5    |

Output:  
(empty set)

*Explanation: No books have a NULL rating, so the result is empty.*

**Example 3:**  
Input:  
Books table:
| book_id | title      | author     | published_year | rating |
|---------|------------|------------|---------------|--------|
| 6       | Foundation | A. Asimov  | 1951          | NULL   |

Output:  
| book_id | title      | author     | published_year |
|---------|------------|------------|---------------|
| 6       | Foundation | A. Asimov  | 1951          |

*Explanation: Only the book with book_id 6 has a NULL rating and is included in the result.*

### Thought Process (as if you’re the interviewee)  
To solve this, I need to filter the rows where the `rating` column is NULL, and then select the specified columns.  
Brute-force would be:  
- Go through all rows, check if `rating` is NULL, and collect relevant columns if so.
In SQL, this is efficiently handled with `WHERE rating IS NULL`.  
An optimized solution sorts results by `book_id` as required.  

Trade-offs: There are no performance concerns for this simple filter and small output columns. Any database can do this efficiently with basic filtering and sorting.  
No additional computation or intermediate state is required.

### Corner cases to consider  
- The Books table is empty — should return an empty set.
- All entries have NULL rating — all should be returned.
- No entries have NULL rating — empty result.
- Some non-required columns exist — only select specified columns.
- Duplicate rows (if any, though primary key should prevent).

### Solution

```python
# Let's implement the equivalent in pandas DataFrame

def find_unrated_books(books):
    # books: pandas DataFrame with required columns
    
    # Filter books where 'rating' is NULL (NaN in pandas)
    unrated = books[books['rating'].isnull()]
    
    # Select only required columns
    result = unrated[["book_id", "title", "author", "published_year"]]
    
    # Order by book_id
    result = result.sort_values(by="book_id")
    
    # Reset the index for cleaner output (not required in SQL)
    return result.reset_index(drop=True)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  n = number of books.  
  Filtering is O(n), selecting columns is O(n), but sorting results by `book_id` is O(n log n).

- **Space Complexity:** O(n)  
  Needs extra space for the temporary filtered and sorted DataFrame.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count how many unrated books there are?  
  *Hint: Use count or len() on the filtered set.*

- What if there are millions of rows? How can you make this faster?  
  *Hint: Index on the `rating` or `book_id` columns.*

- How to filter out books with no rating but published after the year 2000?  
  *Hint: Add another `AND published_year > 2000` / `.loc[...]` filter.*

### Summary
This problem uses **filtering** and **sorting** patterns, which are common in database and data processing tasks.  
The approach is standard and applies to any relational data with "missing value" filtering — it's used for reporting, quality control, and statistics in analytics tasks.  
Pattern variants: find rows based on null/missing, filter by multiple columns, select only needed fields, and order results by primary key or any other column.