### Leetcode 1017 (Medium): Convert to Base -2 [Practice](https://leetcode.com/problems/convert-to-base-2)

### Description  
Given any integer n, represent it in **base -2** (also called "negabinary"). The result should use only digits **0** and **1** with no leading zeros (unless the answer is `"0"` itself). For example, "110" in base \(-2\) actually means:  
1 × \((-2)^2\) + 1 × \((-2)^1\) + 0 × \((-2)^0\).  
You're to return the string representation of n in base \(-2\).

### Examples  

**Example 1:**  
Input: `n = 2`  
Output: `110`  
*Explanation:*  
2 in base \(-2\):  
- \(1 \times (-2)^2 = 4\)  
- \(1 \times (-2)^1 = -2\)  
- \(0 \times (-2)^0 = 0\)  
4 + (-2) + 0 = **2**  

**Example 2:**  
Input: `n = 3`  
Output: `111`  
*Explanation:*  
1 × \((-2)^2\) = 4  
1 × \((-2)^1\) = -2  
1 × \((-2)^0\) = 1  
4 + (-2) + 1 = **3**  

**Example 3:**  
Input: `n = 4`  
Output: `100`  
*Explanation:*  
1 × \((-2)^2\) = 4  
0 × \((-2)^1\) = 0  
0 × \((-2)^0\) = 0  
4 + 0 + 0 = **4**  

### Thought Process (as if you’re the interviewee)  
First, for normal (positive) base conversion, repeatedly divide n by the base and take the remainder as the next digit. For **negative** bases, the main catch is handling negative remainders and correct digit placement:
- When dividing by \(-2\), standard division may yield a negative remainder; instead, always keep the remainder as 0 or 1.
- If remainder is negative, adjust n upwards to make the remainder non-negative and continue division.
- Repeat until n reaches 0, constructing the answer from the least significant to the most significant bit.
- Reverse the string for the answer.

Why this works: each time, n = base \* next_n + remainder, ensuring the result digits correspond correctly for negative bases.

Brute force (simulating powers and subtracting) is messy and inefficient.
The iterative remainder-and-quotient approach is clean and extensible to other negatives bases.

### Corner cases to consider  
- n = 0 → should return "0"
- n < 0, e.g., n = -2, n = -7
- Large n values (check for correct construction, avoid TLE)
- Check for no leading zeros in final string
- Odd/even numbers and their negabinary representations

### Solution

```python
def baseNeg2(n: int) -> str:
    # If the number is zero, just return "0"
    if n == 0:
        return "0"
    
    res = []
    while n != 0:
        # For base -2, get remainder in {0,1}
        remainder = n % 2
        res.append(str(remainder))
        
        # Adjust n for next iteration
        n = (n - remainder) // -2
    
    # Join and reverse to get MSB at the front
    return ''.join(res[::-1])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log |n|)  
  Because in each iteration, n is roughly halved (like base conversion), so the number of iterations (and thus digits appended) is proportional to the bit-length of n.

- **Space Complexity:** O(log |n|)  
  We store up to O(log |n|) characters for the answer.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generalize this to other negative bases, like base -3?
  *Hint: How would you handle the adjustment and remainder logic for an arbitrary negative base?*

- How do you convert base \(-2\) string back to an integer?
  *Hint: Multiply each digit by \((-2)^\text{position}\) and sum.*

- Can you implement this recursively?
  *Hint: Base case and recursive breakdown correspond to division steps.*

### Summary
This problem centers on **non-standard base conversion** patterns. The key idea is adjusting how you collect digits so that they're always in \{0,1\}, even with negative bases, handling carry/borrowing as needed.  
This remainder-division approach is a standard and powerful pattern for converting numbers to any (even negative) base, and occurs in problems involving integer encoding or non-traditional number representations.