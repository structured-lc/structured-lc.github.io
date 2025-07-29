### Leetcode 2802 (Medium): Find The K-th Lucky Number [Practice](https://leetcode.com/problems/find-the-k-th-lucky-number)

### Description  
Given a number k, return the kᵗʰ "lucky number", where a lucky number is a positive integer containing only the digits 4 and 7. Lucky numbers are sorted in increasing order (numeric order, not by digits).  
Example: The first few lucky numbers are: 4, 7, 44, 47, 74, 77, 444, ...

You must find the kᵗʰ lucky number efficiently (without generating all lucky numbers up to k).

### Examples  

**Example 1:**  
Input: `k = 1`  
Output: `4`  
*Explanation: The first lucky number is 4.*

**Example 2:**  
Input: `k = 2`  
Output: `7`  
*Explanation: The second lucky number is 7.*

**Example 3:**  
Input: `k = 3`  
Output: `44`  
*Explanation: The third lucky number is 44. The sequence so far: [4, 7, 44].*

**Example 4:**  
Input: `k = 5`  
Output: `74`  
*Explanation: The fifth lucky number is 74.  
Lucky numbers up to 5: [4, 7, 44, 47, 74].*

### Thought Process (as if you’re the interviewee)  
First, let's clarify the definition: a lucky number consists only of digits 4 and 7, and they're sorted numerically.  
Brute-force:  
- Generate numbers in order, checking if each only has digits 4 and 7.
- This is **very inefficient** for large k (could be up to 1e9).

Analysis:
- All lucky numbers can be grouped by their digit length n:
    - There are 2ⁿ n-digit lucky numbers.
    - For 1-digit: [4, 7]
    - For 2-digits: [44, 47, 74, 77], and so on.

Optimization:
- Figure out how many digits the kᵗʰ lucky number has, and its position among all n-digit lucky numbers.
    - Loop: For each digit number n, check if k > 2ⁿ. If so, subtract 2ⁿ, increase n.
    - When k ≤ 2ⁿ for some n, the answer has n digits, and is the kᵗʰ among all n-digit lucky numbers (in lexicographical order).
- To get the lucky number: For each of the n digits, if k is in the first half of the remaining range, next digit is '4'; else it's '7' and adjust k.

Trade-offs:
- This achieves O(log k) time complexity, which is efficient enough for k up to 10⁹.

### Corner cases to consider  
- k = 1 (should return "4")
- Small k (test both odd and even positions)
- Large k (test performance and correctness for high values, e.g., k = 1e9)
- Make sure leading digit is correct (no leading zeros, must be '4' or '7' only)
- Test transitions between different digit lengths (e.g., k just past a power of 2 boundary)

### Solution

```python
def kthLuckyNumber(k: int) -> str:
    # Step 1: Find number of digits n in the answer.
    n = 1
    while k > (1 << n):  # 2ⁿ numbers for n digits
        k -= (1 << n)
        n += 1

    # Step 2: Build the lucky number digit by digit.
    ans = []
    for i in range(n - 1, -1, -1):  # i = n-1 to 0 (most to least significant)
        if k <= (1 << i):
            ans.append('4')
        else:
            ans.append('7')
            k -= (1 << i)
    return ''.join(ans)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log k)  
  Because at most log₂k iterations are needed (finding the digit count and constructing the answer).
- **Space Complexity:** O(log k)  
  Only need space for answer digits (proportional to number of digits, which is log₂k).

### Potential follow-up questions (as if you’re the interviewer)  

- What if instead of digits 4 and 7, the lucky digits are any given set D?  
  *Hint: Can you generalize using base len(D) and mapping digits accordingly?*

- How would you find all lucky numbers between two given numbers a and b?  
  *Hint: Generate all lucky numbers up to b and filter those ≥ a (or use DFS backtracking).*

- How to find the sum of the first k lucky numbers?  
  *Hint: Use the kᵗʰ lucky number formula, and simulate or enumerate as needed but optimize for large k.*

### Summary
This problem uses a pattern similar to conversion between a number and its binary representation, but "4" and "7" replace "0" and "1." The solution efficiently determines the number of digits, and digit-by-digit constructs the answer by mapping the binary-like positions to "4" and "7." This approach is related to bit manipulation, combinatorial enumeration, and sometimes applies in "binary-like" base conversion problems in coding interviews.