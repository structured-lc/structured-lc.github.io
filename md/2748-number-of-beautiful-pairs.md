### Leetcode 2748 (Easy): Number of Beautiful Pairs [Practice](https://leetcode.com/problems/number-of-beautiful-pairs)

### Description  
You are given an array of integers `nums`. A pair of indices (i, j) is called **beautiful** if 0 ≤ i < j < n, and the **first digit** of `nums[i]` and the **last digit** of `nums[j]` are coprime (i.e., their greatest common divisor is 1). You need to return the total number of beautiful pairs in `nums`.

### Examples  

**Example 1:**  
Input: `nums = [2,5,1,4]`,  
Output: `5`  
*Explanation: The beautiful pairs and their (first, last) digits are: (2,5), (2,1), (2,4), (5,1), (5,4), all coprime. (1,4) is not beautiful because both digits are not coprime.*

**Example 2:**  
Input: `nums = [11,21,31]`,  
Output: `3`  
*Explanation: Pair (0,1): 1 and 1 are coprime. Pair (0,2): 1 and 1 are coprime. Pair (1,2): 2 and 1 are coprime. All three pairs are beautiful.*

**Example 3:**  
Input: `nums = [14,23,35,19]`,  
Output: `6`  
*Explanation: All pairs (i,j) where i < j have (first, last) digits coprime.*

### Thought Process (as if you’re the interviewee)  
- Start by brute-force: Check all pairs (i, j) where i < j, extract first digit of nums[i] and last digit of nums[j], and check if they're coprime (gcd == 1). Count the number of such pairs.
- Brute-force has O(n²) time; for n up to 10⁴ this is too slow.
- Optimize: There are only 9 possible first digits (1-9) and 10 possible last digits (0-9), so we can count efficiently.
- Iterate through the array once. For each number, find its last digit. For all first digits encountered so far, if the first digit and last digit are coprime, sum the count for that first digit.
- For each number, update the count for its first digit so future numbers can use it.
- This reduces compares from O(n²) to O(n × 10) and uses a small auxiliary array for count of first digits.

### Corner cases to consider  
- Single-element array (output should be 0 since no pairs).
- All elements are equal (first and last digit cases).
- Elements with leading or trailing zeros.
- Input with maximal/minimal number limits.
- Edge where multiple numbers share first digit or last digit.

### Solution

```python
def count_beautiful_pairs(nums):
    # Helper to extract the first digit of an integer
    def first_digit(x):
        while x >= 10:
            x //= 10
        return x

    # Simple gcd computation
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    first_count = [0] * 10  # Count of first digits seen so far (indices 1-9 used)
    ans = 0

    for num in nums:
        last = num % 10
        for f in range(1, 10):
            if first_count[f] > 0 and gcd(f, last) == 1:
                ans += first_count[f]
        fd = first_digit(num)
        first_count[fd] += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 9) = O(n). For each element, at most 9 gcd checks (only 1-9 possible leading digits).
- **Space Complexity:** O(1). The count array has fixed size (10). No extra space dependent on n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and cannot fit in memory?  
  *Hint: Can you process in streaming fashion or with batch statistics?*

- What if you also want to find the pairs themselves, not just the count?  
  *Hint: You'd need to store combinations or indices, increasing memory use.*

- What if only pairs with both numbers even (or odd) count as beautiful?  
  *Hint: Add another conditional in counting phase or adjust the counting structure.*

### Summary
This problem is an application of **counting with digits** and **number theory (gcd/coprime)**. Instead of examining all pairs, we use **digit bucketization**: for each new number, exploit previously seen first digits to efficiently check coprimality. This is a common pattern for "pair" problems with digit-derived rules, such as "pairs whose sum has a certain property". The technique is applicable to other digit-based or quantized counting pair problems.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting), Number Theory(#number-theory)

### Similar Problems
