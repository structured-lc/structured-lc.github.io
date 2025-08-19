### Leetcode 3536 (Easy): Maximum Product of Two Digits [Practice](https://leetcode.com/problems/maximum-product-of-two-digits)

### Description  
Given a positive integer n, find the **maximum product** of any two digits from n.  
The same digit may be used twice if it appears more than once in n.  
You need to extract the digits, compute every possible product using any two of them (including possibly the same digit), and return the largest such product.

### Examples  

**Example 1:**  
Input: `n = 31`  
Output: `3`  
*Explanation: Digits are [3, 1]. Products: 3 × 1 = 3. Maximum is 3.*

**Example 2:**  
Input: `n = 22`  
Output: `4`  
*Explanation: Digits are [2, 2]. Products: 2 × 2 = 4. Maximum is 4.*

**Example 3:**  
Input: `n = 124`  
Output: `8`  
*Explanation: Digits are [1, 2, 4]. Products: 1 × 2 = 2, 1 × 4 = 4, 2 × 4 = 8. Maximum is 8.*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force:**  
   - Convert n to a list of digits.
   - Try all possible pairs (including repeats if digits are repeated).
   - For each pair, calculate the product.
   - Return the maximum of all calculated products.
   - For k digits, number of pairs is O(k²) but since n has at most 10 digits, that's manageable.

2. **Optimize:**  
   - The product will be maximized by multiplying the two largest digits.
   - So, simply find the two largest digits and return their product.
   - If largest digit appears more than once, can use it twice (e.g., digit 9 in `99`).  

**Trade-off:**  
Brute-force is very direct but wasteful. Optimized approach is very concise and fits well due to the small possible number of digits.

### Corner cases to consider  
- All digits are the same (e.g., `1111`).
- Largest digit appears twice (e.g., `99`).
- Only two digits in n.
- n contains a 0 (potential product is 0).
- Digits are strictly increasing/decreasing order.
- n is exactly two digits.

### Solution

```python
def maximumProduct(n: int) -> int:
    # Step 1: Extract digits into a list
    digits = []
    while n > 0:
        digits.append(n % 10)
        n //= 10
    
    # Step 2: Find the two largest digits
    max1 = max2 = -1
    for d in digits:
        if d > max1:
            max2 = max1
            max1 = d
        elif d > max2:
            max2 = d
    
    # Step 3: Return product of two largest digits
    return max1 * max2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k), where k = number of digits (≤10). Each digit is processed to find top two.
- **Space Complexity:** O(k), for storing digits. (Could reduce space to O(1) by iterating through n repeatedly.)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the digits of n are provided as a string or list, not integer?  
  *Hint: Parse accordingly, but logic remains.*

- How would you modify for the maximum product of k digits?  
  *Hint: Use a heap or sort to find the k largest digits.*

- Can you do this without extra space for digits?  
  *Hint: Extract and track max as you process each digit.*

### Summary
This problem is an example of the "tracking max values while iterating" pattern, commonly used for questions about top-k or maximum values. Here, direct scanning for the two largest values eliminates the need for brute-force examination of all pairs, and the constraints allow for a straightforward O(k) solution. This approach applies to any similar "maximum pair product" from a set or sequence.

### Tags
Math(#math), Sorting(#sorting)

### Similar Problems
