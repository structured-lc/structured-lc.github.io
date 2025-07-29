### Leetcode 3570 (Easy): Find Books with No Available Copies [Practice](https://leetcode.com/problems/find-books-with-no-available-copies)

### Description  
Given two tables:

- `library_books`: Contains information about each book in the library, including `book_id`, `title`, `author`, `genre`, `publication_year`, and `total_copies` (the number of physical copies in the library).
- `borrowing_records`: Lists when each `book_id` was borrowed and, if returned, the `return_date`.

Find all **books that are currently borrowed (not returned) and have zero copies available in the library**; that is, the number of people who currently have a copy borrowed is equal to the book's total copies.  

Return all such books, showing columns: `book_id`, `title`, `author`, `genre`, `publication_year`, and `current_borrowers`. Sort by `current_borrowers` in descending order, then by `title` in ascending order.

### Examples  

**Example 1:**  
Input:  
library_books =  
| book_id | title     | author    | genre   | publication_year | total_copies |
|---------|-----------|-----------|---------|------------------|--------------|
|  1      | "A Tale"  | "Dickens" | "Novel" |      1860        |     2        |
|  2      | "Winds"   | "Martin"  | "Fantasy"|     1996        |     1        |

borrowing_records =  
| book_id | borrow_date | return_date |
|---------|-------------|-------------|
|   1     |   2024-01-01|    null     |
|   1     |   2024-01-05|    null     |
|   2     |   2024-02-01| 2024-02-05  |

Output:
| book_id | title    | author    | genre  | publication_year | current_borrowers |
|---------|----------|-----------|--------|------------------|-------------------|
|  1      | "A Tale" | "Dickens" | "Novel"|     1860        |         2         |

*Explanation: Both copies of book 1 ("A Tale") are currently borrowed and none are available. Book 2 is not fully borrowed.*  

**Example 2:**  
Input:  
library_books =  
| book_id | title    | author   | genre     | publication_year | total_copies |
|---------|----------|----------|-----------|------------------|--------------|
|  4      | "Space"  | "Ada"    | "Sci-Fi"  |     2021         |     1        |

borrowing_records =  
| book_id | borrow_date | return_date |
|---------|-------------|-------------|
|   4     |   2024-03-01|     null    |

Output:
| book_id | title   | author | genre    | publication_year | current_borrowers |
|---------|---------|--------|----------|------------------|-------------------|
|   4     | "Space" | "Ada"  | "Sci-Fi" |     2021         |        1          |

*Explanation: The only copy of "Space" is borrowed. Hence, no available copies.*

**Example 3:**  
Input:  
library_books =  
| book_id | title     | author    | genre     | publication_year | total_copies |
|---------|-----------|-----------|-----------|------------------|--------------|
|   7     | "Return"  | "Kim"     | "Memoir"  |     2018         |     2        |

borrowing_records =  
| book_id | borrow_date | return_date |
|---------|-------------|-------------|
|   7     | 2023-11-01  | 2023-12-01  |

Output: (empty)

*Explanation: All borrowings have been returned, so both copies are available. No output.*

### Thought Process (as if you’re the interviewee)  
- Start by identifying all books that currently have at least one copy borrowed: filter the `borrowing_records` table for rows where `return_date` is null.
- For each such `book_id`, compute how many people currently have the book (group by `book_id` and count).
- Next, join these counts with the `library_books` table, which contains the number of total copies available for each book.
- The books that have "no available copies" are those where the current number of borrowers equals `total_copies`.
- Finally, return all columns as required and sort by `current_borrowers` descending, then by `title` ascending.
- For edge cases—books with no borrowings (never borrowed), books with all borrows returned—these shouldn't appear in the result.

### Corner cases to consider  
- Books never borrowed before: Shouldn't appear in result.
- borrowings with return_date null vs. not null: Only count ones not returned.
- Total copies more than current borrowers: Shouldn't appear.
- Borrowing records references a book not in library_books (invalid foreign keys): Should not appear.
- Library with zero total books or zero borrowing records: Should return an empty result set.
- Multiple books with zero available copies; test the ordering of the output.
- Borrowed copies returned later (borrowings in the past): Only check currently borrowed.

### Solution

```python
def find_books_with_no_available_copies(library_books, borrowing_records):
    # Step 1: Calculate current borrowers for each book (return_date is None)
    current_borrowers = {}
    for record in borrowing_records:
        book_id = record['book_id']
        # Check if the book is currently borrowed (not returned)
        if record['return_date'] is None:
            current_borrowers[book_id] = current_borrowers.get(book_id, 0) + 1

    result = []
    for book in library_books:
        book_id = book['book_id']
        total_copies = book['total_copies']
        borrowers = current_borrowers.get(book_id, 0)
        # Add to result if all copies are currently borrowed
        if borrowers == total_copies and borrowers > 0:
            result.append({
                'book_id': book_id,
                'title': book['title'],
                'author': book['author'],
                'genre': book['genre'],
                'publication_year': book['publication_year'],
                'current_borrowers': borrowers
            })

    # Sort by current_borrowers descending and title ascending
    result.sort(key=lambda b: (-b['current_borrowers'], b['title']))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N is the number of borrowing records and M is the number of books. Each list is iterated at most once.
- **Space Complexity:** O(K), where K is size of `current_borrowers` (at most one per distinct book_id), plus the result array (at most M).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to find books where less than half the copies were available?
  *Hint: Instead of equality, compare current borrowers to ⌊total_copies/2⌋.*

- How would you update this for real-time inventory, where books can be borrowed and returned in rapid succession?
  *Hint: Consider database triggers or a streaming approach.*

- Can you extend this to output the user IDs of people currently borrowing each fully-borrowed book?
  *Hint: Aggregate list of active borrowers along with book info.*

### Summary
This problem is classic **group and join/aggregation**—first aggregate current counts from one table (borrowing records), then join with another (book info), and finally filter by a numeric condition. The pattern is widely used in SQL, pandas, or procedural code dealing with inventory, reservations, or similar resource-limited systems. This approach ensures correctness and efficiency, and adapts well for new constraints or aggregation types.