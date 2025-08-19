### Leetcode 3465 (Easy): Find Products with Valid Serial Numbers [Practice](https://leetcode.com/problems/find-products-with-valid-serial-numbers)

### Description  
Given a database table `products` with columns: `product_id` (int), `product_name` (string), and `description` (string), find all products where the description contains a **valid serial number**.  
A valid serial number must:
- Be case-sensitive: starts with "SN"
- Follow with **exactly four digits**
- Followed by a hyphen (`-`)
- End with **exactly four digits**  
Pattern: SNdddd-dddd (where d is a digit)  
The serial number can be located anywhere inside the description string.

Return the list of matched products, ordered by `product_id`.

### Examples  

**Example 1:**  
Input:  
Table rows:  
| product_id | product_name | description                            |
|------------|-------------|----------------------------------------|
| 1          | Widget A    | This is a sample product with SN1234-5678 |
| 2          | Widget B    | No serial here                           |
| 3          | Widget C    | Serial: SN9876-5432 is here              |

Output:  
[  
  [1, "Widget A", "This is a sample product with SN1234-5678"],  
  [3, "Widget C", "Serial: SN9876-5432 is here"]  
]  
*Explanation: Products 1 and 3 contain valid serial numbers matching the required pattern.*

**Example 2:**  
Input:  
| product_id | product_name | description                  |
|------------|-------------|------------------------------|
| 4          | Widget D    | Contains SN12-5678           |
| 5          | Widget E    | Another product SN12345-6789 |
| 6          | Widget F    | The serial numbers: MYSN1234-5678 |

Output:  
[]  
*Explanation:  
- Widget D: "SN12-5678" only has 2 digits after SN, not 4.  
- Widget E: "SN12345-6789" has 5 digits, not exactly 4.  
- Widget F: "MYSN1234-5678": SN is not at a word boundary. Pattern must start with SN exactly, not as a substring inside another word.*

**Example 3:**  
Input:  
| product_id | product_name | description                        |
|------------|-------------|------------------------------------|
| 7          | Widget G    | Contains serial SN0000-0000        |
| 8          | Widget H    | SN1111-2222 extra SN3333-4444      |
| 9          | Widget I    | Just some text                     |

Output:  
[  
  [7, "Widget G", "Contains serial SN0000-0000"],  
  [8, "Widget H", "SN1111-2222 extra SN3333-4444"]  
]  
*Explanation: Both products have valid serial numbers. Multiple serials in the same description are OK as long as at least one matches.*


### Thought Process (as if you’re the interviewee)  

- **Step 1:** The problem is to detect a strict string pattern (SNdddd-dddd) in the description text.  
- **Brute-force:**  
  - Loop through each description, **check every substring** of length 11 (since SN plus 4+1+4 = 11), validate via manual checks (first 2 chars SN, then 4 digits, then '-', then 4 digits).
  - This is tedious in practice and inefficient.
- **Optimized:**  
  - Use **regular expressions** to match the required serial number pattern within the string.
  - Pattern: "SN[0-9]{4}-[0-9]{4}" (case-sensitive match).
  - But: We must ensure that "SN" is not part of another word, i.e., not "MYSN1234-5678". So anchor with word boundaries or ensure non-alphanumeric character (or start-of-string) before SN.
- **Implementation:**  
  - In Python: re.search(r'(?<![A-Za-z0-9])SN\d{4}-\d{4}(?!\d)', description)
  - In SQL: Use REGEXP patterns, handle word boundary with '(^|[^A-Za-z0-9])SN[0-9]{4}-[0-9]{4}($|[^0-9])'
- **Trade-offs:**  
  - Regex is much cleaner, more robust.
  - Manual scan of string would be verbose and error-prone.
  - Regex approach is standardized and highly readable.

### Corner cases to consider  
- Empty product table (no rows).
- Description without any serial number text.
- Description with "SN" as part of another word (e.g., "MYSN1234-5678").
- Serial number at the start or end of description.
- Multiple serial numbers in one description.
- Serial numbers with the wrong number of digits.
- Serial number in wrong format (missing dash, extra letters).
- Description containing "sn" in lowercase (should **not** match; must be case-sensitive).
- Serial surrounded by punctuation (like parentheses or spaces).

### Solution

```python
import re

def find_products_with_valid_serial_numbers(products):
    """
    products: List of [product_id, product_name, description]
    Return: List of [product_id, product_name, description] with valid serial numbers
    """
    result = []
    # Regular expression:
    # - (?<![A-Za-z0-9]): Left boundary is non-alphanum or start-of-string
    # - SN\d{4}-\d{4}: Pattern to match
    # - (?!\d): Must not be followed by a digit (so only 4 digits after hyphen)
    pattern = re.compile(r'(?<![A-Za-z0-9])SN\d{4}-\d{4}(?!\d)')
    for pid, name, desc in products:
        if pattern.search(desc):
            result.append([pid, name, desc])
    # Sort result by product_id
    result.sort(key=lambda x: x[0])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N \* L), where N = number of products, L = average description length.  
  - Each regex search takes up to O(L).
- **Space Complexity:** O(R), where R = number of matching products.
  - No extra data structures apart from output. Regex engine uses negligible additional memory.

### Potential follow-up questions (as if you’re the interviewer)  

- What if serial numbers can have variable digits (e.g., 3-5 digits in each segment)?  
  *Hint: Adjust the regex number quantifiers (e.g., \d{3,5}).*

- What if description is very large (tens of MB each), or there are millions of products?  
  *Hint: Consider streaming processing or optimizing by limiting scan size.*

- What if serial numbers can appear in other columns or multiple columns need validation?  
  *Hint: Generalize the column to check, iterate through each text-column, or extend regex validation accordingly.*

### Summary
This problem is a classic **regex string pattern matching** use-case. It exemplifies validation search within larger text, a common theme in data cleansing, parsing logs, or extracting entities from unstructured fields. Similar patterns arise in record validation, input sanitization, or parsing structured IDs from free-form text. The reusable coding pattern is: iterate rows, extract matches with regex, accumulate results.

### Tags
Database(#database)

### Similar Problems
