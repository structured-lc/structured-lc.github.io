### Leetcode 3697 (Easy): Compute Decimal Representation [Practice](https://leetcode.com/problems/compute-decimal-representation)

### Description  
Given a positive integer **n**, express **n** as a sum of the fewest possible *base-10 components*, and return these components in descending order.  
A *base-10 component* is any positive integer that can be written as `d × 10ᵏ` where `1 ≤ d ≤ 9` and `k ≥ 0`.  
For example, 500, 30, and 7 are base-10 components (since their only nonzero digit is in one place); but 57 or 11 are not (since multiple nonzero digits in their decimal expansion).  
You must break up **n** to a sum of such numbers with as few parts as possible.

### Examples  

**Example 1:**  
Input: `n = 502`  
Output: `[500, 2]`  
Explanation: 502 is expressed as 500 (from the hundreds place) + 2 (from the units place).

**Example 2:**  
Input: `n = 7041`  
Output: `[7000, 40, 1]`  
Explanation: 7041 = 7000 (thousands), 40 (tens), and 1 (units).

**Example 3:**  
Input: `n = 13205`  
Output: `[10000, 3000, 200, 5]`  
Explanation: 13205 = 10000 + 3000 + 200 + 5.

### Thought Process (as if you’re the interviewee)  
First, let's clarify: every nonzero digit in the decimal representation of n creates a base-10 component by shifting its place value: if the iᵗʰ digit (from the left) is nonzero, then that digit × 10ᵏ where k is the position from the right.  
A brute-force approach:  
- For each decimal place, extract the digit, and if it's nonzero, build the component accordingly.
This is both efficient and optimal, since each nonzero digit must become a separate base-10 component, and this approach minimizes the count.
To build the answer in *descending order*, process digits from left (most significant) to right (least significant).

Optimization:  
- No true optimization is needed beyond basic string or integer iteration; the approach is already O(log n).  
- Two ways to extract digits: (1) Convert n to a string and iterate with index, or (2) Use modulo/division to extract digits from the end and reverse at the end (to get descending order).

Trade-offs:  
- String method is most concise and clear.
- Manual digit extraction without string conversion is more "pure math", but less readable.

### Corner cases to consider  
- n has zeros in the middle or on the right (e.g., `n = 1002` → `[1000, 2]`)
- n has all digits nonzero (e.g., `n = 321` → `[300, 20, 1]`)
- n is only one digit (e.g., `n = 8` → `[8]`)
- n is already a base-10 component (e.g., `n = 4000` → `[4000]`)

### Solution

```python
def compute_decimal_representation(n):
    # Convert n to string to process digits by position
    s = str(n)
    length = len(s)
    result = []
    for i in range(length):
        digit = int(s[i])
        if digit != 0:
            # The position from right is (length - 1 - i)
            value = digit * (10 ** (length - 1 - i))
            result.append(value)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  There are as many iterations as the number of digits in n, which is ⌊log₁₀ n⌋ + 1.

- **Space Complexity:** O(log n)  
  At most one entry per digit (nonzero digits only), so in worst case (all digits nonzero) at most log n space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be as large as 10¹⁸ or even larger?  
  *Hint: Can your approach still handle it without hitting integer/string limits?*

- Could you solve this without converting to a string at all?  
  *Hint: Extract digits using division and modulus.*

- How would you modify the function to return the sum in ascending order of value?  
  *Hint: Store and reverse at the end or use an alternate data structure.*

### Summary
We leverage a simple digit-place decomposition: for each nonzero digit, create its base-10 component by shifting with the appropriate power of 10. The coding pattern is similar to "decimal expansion" extraction. This pattern frequently appears in number manipulation, digital root, and digit-place problems in interviews.

### Tags
Array(#array), Math(#math)

### Similar Problems
