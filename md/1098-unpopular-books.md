### Leetcode 1098 (Medium): Unpopular Books [Practice](https://leetcode.com/problems/unpopular-books)

### Description  
Given two tables, **Books** and **Orders**:

- The **Books** table contains fields: `book_id`, `name`, and `available_from`.
- The **Orders** table has: `order_id`, `book_id`, `quantity`, and `dispatch_date`.

You are asked to write a query to find books that are considered **unpopular** under two conditions:
- The book was released **more than a month** before `2019-06-23` (i.e., released **on or before** `2019-05-23`).
- The **total quantity** sold **within the last year** (i.e., for all orders with `dispatch_date` between `2018-06-23` and `2019-06-23` inclusive) is **less than 10**.

Return the `book_id` and `name` of such books.

### Examples  

**Example 1:**  
Input:  
Books:

|book_id|name|available_from|
|--|--|--|
|1|Kalila And Demna|2010-01-01|
|2|28 Letters|2012-05-12|
|3|The Hobbit|2019-06-10|
|4|13 Reasons Why|2019-06-01|
|5|The Hunger Games|2008-09-21|

Orders:

|order_id|book_id|quantity|dispatch_date|
|--|--|--|--|
|1|1|2|2018-07-26|
|2|1|1|2018-11-05|
|3|3|8|2019-06-11|
|4|4|6|2019-06-05|
|5|4|5|2019-06-20|
|6|5|9|2009-02-02|
|7|5|8|2010-04-13|

Output:  
```
book_id | name
-------------------------
1       | Kalila And Demna
5       | The Hunger Games
```
Explanation:  
- Only books released on or before 2019-05-23 are eligible.
- For book 1, total sold from 2018-06-23 to 2019-06-23 = 2+1=3 (<10).
- Book 5 had no sales in the given period (so total=0, which is <10).
- Book 4 (released 2019-06-01) has 6+5=11 sales, not <10.
- Book 3 released after 2019-05-23; ineligible.

**Example 2:**  
Input:  
Books:  
*empty table*  
Orders:  
*empty table*  
Output:  
```
(empty)
```
Explanation:  
There are no books to return.

**Example 3:**  
Input:  
Books:

|book_id|name|available_from|
|--|--|--|
|6|New Hit|2019-06-15|

Orders:

|order_id|book_id|quantity|dispatch_date|
|--|--|--|--|
|8|6|15|2019-06-18|

Output:  
```
(empty)
```
Explanation:  
The book's release was after 2019-05-23, so it does not qualify, even though its sales would have made it "popular".

### Thought Process (as if you’re the interviewee)  

First, to identify **books that have been released for more than one month prior to 2019-06-23**, I can filter `Books.available_from` ≤ 2019-05-23.

Next, I need to **sum up all sales for each eligible book** where order's `dispatch_date` falls between 2018-06-23 and 2019-06-23. If the sum is less than 10, we want to return the book.

A common brute-force approach would be:
- For each book, get all orders in the sales period, sum quantities, check if <10, and check the release date.
- This is doable in code, but in SQL we’d use `LEFT JOIN` to ensure books with zero sales are considered (as zero counts as "unpopular").
- For the aggregation logic, use `GROUP BY` book.
- The left join allows detection of books with no orders.
- Optimize by letting the DB engine filter and aggregate using join and `HAVING` clause. No need to precompute sub-results.

### Corner cases to consider  
- Books with **zero sales** in the year: must be included if other conditions match.
- Orders outside the required dispatch date range: ignore these.
- Books released **exactly** one month before: 2019-05-23 is *included*.
- Books with multiple identical dispatch dates: add all quantities.
- Multiple orders of same book in time range: sum up quantities accurately.
- Books that were available less than a month: always ignore.
- Empty Books or Orders tables.
- Orders referencing books not in Books: should not happen.

### Solution

```python
# Since this is SQL-style logic, here's the equivalent Python pseudocode:
# Assume 'books' is a list of dicts with keys: 'book_id', 'name', 'available_from'
# Assume 'orders' is a list of dicts with keys: 'order_id', 'book_id', 'quantity', 'dispatch_date'

def unpopular_books(books, orders):
    from datetime import datetime

    # Define cutoff dates
    today = datetime.strptime("2019-06-23", "%Y-%m-%d")
    month_ago = datetime.strptime("2019-05-23", "%Y-%m-%d")
    year_ago = datetime.strptime("2018-06-23", "%Y-%m-%d")

    # Track book_id -> {'name':..., 'release_date':...}
    book_map = {}
    for book in books:
        release = datetime.strptime(book['available_from'], "%Y-%m-%d")
        if release <= month_ago:
            book_map[book['book_id']] = {'name': book['name'], 'sold': 0}

    # Sum up the quantities of orders within the date range
    for order in orders:
        b_id = order['book_id']
        if b_id in book_map:
            odate = datetime.strptime(order['dispatch_date'], "%Y-%m-%d")
            if year_ago <= odate <= today:
                book_map[b_id]['sold'] += order['quantity']

    # Find books where sold < 10
    result = []
    for b_id, info in book_map.items():
        if info['sold'] < 10:
            result.append({'book_id': b_id, 'name': info['name']})

    # Sort by book_id ascending for output
    result.sort(key=lambda x: x['book_id'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = number of books, M = number of orders. Each book and each order is processed once.
- **Space Complexity:** O(N), where N = number of books (for mapping book info and sale counts).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the required cutoff dates or time ranges become variables rather than hardcoded?
  *Hint: Discuss parameterization and dynamic date calculation.*

- How would you handle ties or books with exactly 10 sales?
  *Hint: Clarify '<' versus '≤' and update HAVING clause if needed.*

- How might database indexing affect performance for very large Books and Orders tables?
  *Hint: Consider indexes on `book_id`, `dispatch_date`, and possibly composite indexes.*

### Summary

This is a classic **filter-and-aggregate SQL pattern**, combining `JOIN`, range filtering, and `GROUP BY + HAVING`. It exemplifies *anti-join* or *find missing/low-count cases*, useful in finding inactive users, customers with low spend, or underutilized resources in analytics-heavy or reporting queries. The logic is easily adapted between SQL and code, and mastering this pattern is extremely useful for database and backend interviews.