### Leetcode 3415 (Easy): Find Products with Three Consecutive Digits  [Practice](https://leetcode.com/problems/find-products-with-three-consecutive-digits)

### Description  
Given a table of products with `product_id` and `name`, return all products whose **name** has any substring of **exactly three consecutive digits** (for example: "abc123x").  
The substring must be exactly three digits — a longer sequence (e.g., "1234") does not count.  
Return the `product_id` and `name` sorted by `product_id` in ascending order.

### Examples  

**Example 1:**  
Input:  
Products =  
| product_id | name        |  
|------------|------------|  
| 1          | ABC123XYZ  |  
| 2          | Book456    |  
| 3          | Code1234   |  
| 4          | tool12A    |  
| 5          | 789Product |  
| 6          | Item003Description |  
| 7          | Sample0012 |  

Output:  
| product_id | name        |  
|------------|------------|  
| 1          | ABC123XYZ  |  
| 2          | Book456    |  
| 5          | 789Product |  
| 6          | Item003Description |  

*Explanation:*
- "ABC123XYZ" contains "123" (valid, exactly three digits).
- "Book456" contains "456" (valid).
- "Code1234" has "1234" (four digits, invalid).
- "tool12A" only has "12" (only two digits, invalid).
- "789Product" has "789" (valid).
- "Item003Description" has "003" (valid).
- "Sample0012" has "0012" (four digits, invalid).


**Example 2:**  
Input:  
Products =  
| product_id | name        |  
|------------|------------|  
| 1          | test111ab  |  
| 2          | res12xx    |  
| 3          | abc2222b   |  

Output:  
| product_id | name      |  
|------------|-----------|  
| 1          | test111ab |  

*Explanation:*
- "test111ab" has "111" (three digits, valid).
- "res12xx" only has "12" (two digits).
- "abc2222b" has "2222" (four digits, not exactly three).


**Example 3:**  
Input:  
Products =  
| product_id | name        |  
|------------|------------|  
| 1          | book       |  
| 2          | table      |  
| 3          | 1234abc    |  

Output:  
(empty)

*Explanation:*
- None of the product names contains **exactly** three consecutive digits.


### Thought Process (as if you’re the interviewee)  
- First, I'll scan each product's `name` and look for any substring with exactly **three consecutive digits**.
- I need to make sure that the substring is not part of a longer sequence of digits (e.g., "1234" should be invalid). So, I can't just check for "any 3 digits".
- For each position in the string, if there's a substring of three digits, I also need to confirm that the character(s) before and after are **not digits** (or are not present at all).
- Brute force: For every possible substring of length 3, check if all are digits, then check neighbor characters.
- Optimization: Instead of building custom logic, I can use regular expressions to match the pattern — e.g., r'(^|[^0-9])[0-9]{3}([^0-9]|$)'.
  - This ensures three digits are not immediately proceeded or followed by another digit.
- Iterate over each product and apply the check; collect valid ones.  
- Time is not a concern since data size is typically small here, but using regex keeps code clean and robust.


### Corner cases to consider  
- Name starts or ends with three digits ("123abc", "abc123").
- Three digits surrounded by letters ("a123b").
- Names with only digits, more than three ("1234", "12345").
- Names with multiple three-digit substrings; only needs one valid occurrence.
- Names with two digits only ("ab12").
- Empty name field.
- Names with non-alphanumeric chars adjacent to digits ("a-123b").


### Solution

```python
def find_products_with_three_consecutive_digits(products):
    '''
    Args:
        products: List of dicts with keys 'product_id' and 'name'
    Returns:
        List of products (dicts) that have exactly three consecutive digits in 'name'
        Sorted by 'product_id' ascending
    '''
    import re

    pattern = re.compile(r'(^|[^0-9])([0-9]{3})([^0-9]|$)')

    result = []
    for product in products:
        name = product['name']
        if pattern.search(name):
            result.append({'product_id': product['product_id'], 'name': name})

    # Sort result by product_id ascending
    result.sort(key=lambda x: x['product_id'])

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n is the number of products, m is the average name length. Regex search for each product is O(m). Sorting is O(n log n), but n is usually small.
- **Space Complexity:** O(n) for output storage; O(1) extra besides results.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the requirement changes to capture all three-or-more consecutive digits?
  *Hint: Adjust the regex for [0-9]{3,} and process as needed.*

- How do you handle case where you need the **count** of different three-digit substrings?
  *Hint: Find all non-overlapping matches and count their frequency.*

- Can you do it in SQL directly, not Python?
  *Hint: Use the REGEXP operator (see MySQL/SQLite) with a similar regex expression.*

### Summary
This problem uses a classic **regex filtering** pattern—searching for structural patterns within strings. The key trick is ensuring **boundary conditions** (not part of a longer digit sequence). This generalizes to data cleaning, parsing, and text validation problems commonly found in data engineering and backend work.

### Tags
Database(#database)

### Similar Problems
