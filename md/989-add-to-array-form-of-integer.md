### Leetcode 989 (Easy): Add to Array-Form of Integer [Practice](https://leetcode.com/problems/add-to-array-form-of-integer)

### Description  
You are given a non-negative integer represented as an array of digits (**most significant digit first**). Given another integer `k`, add `k` to the integer represented by the array. Return the sum as an array of digits in the same most-significant-digit-first order.  
This is just like adding numbers *by hand*, starting from the least significant digit (rightmost), managing carries as you go.

### Examples  

**Example 1:**  
Input: `num = [1,2,0,0], k = 34`  
Output: `[1,2,3,4]`  
*Explanation: 1200 + 34 = 1234. New array form is [1,2,3,4].*

**Example 2:**  
Input: `num = [2,7,4], k = 181`  
Output: `[4,5,5]`  
*Explanation: 274 + 181 = 455. New array form is [4,5,5].*

**Example 3:**  
Input: `num = [2,1,5], k = 806`  
Output: `[1,0,2,1]`  
*Explanation: 215 + 806 = 1021. New array form is [1,0,2,1].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Convert the array to an integer, add `k`, then convert back to an array.  
  - Problem: For large input (up to 10⁴ digits), this conversion could **overflow** or be too slow.

- **Optimized approach (Digit-by-digit addition):**  
  We can mimic “manual addition”:  
  - Start from the end of the array (least significant digit).
  - Add `k`’s least significant digit and the carry, update the digit, move one place left, and update `k` and the carry accordingly.
  - Keep going as long as there are any digits in `num` or `k > 0` or there is a carry.
  - Append the result in reversed order, and finally reverse the list.

- **Why this approach?**  
  - Handles very large numbers that don’t fit in primitive data types.
  - Runs in O(max(len(num), len(str(k)))) time.

### Corner cases to consider  
- Empty input array (`num` is never empty per problem constraints, but check for trailing or leading zeros).
- `num` has all digits 9, so result is longer (like [9,9,9], k=2).
- `k` is zero.
- `k` is much larger than num, so the addition “extends” the array (e.g. num=[1,2], k=999).
- Input with single-digit and multi-digit numbers.

### Solution

```python
def addToArrayForm(num, k):
    res = []
    i = len(num) - 1

    # Start adding from last digit of num and least significant digit of k
    while i >= 0 or k > 0:
        if i >= 0:
            k += num[i]
        res.append(k % 10)   # Add current digit
        k //= 10             # Carry for next digit
        i -= 1

    # Reverse since we built res with least significant digits first
    return res[::-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max(N, L)), where  
  - **N** is the length of `num`,  
  - **L** is the number of digits in `k`.  
  We traverse both at most once, digit by digit.

- **Space Complexity:** O(max(N, L)),  
  because the result array will at most be one digit longer than either input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array can be extremely large (e.g., a million digits)?
  *Hint: Is your space/time usage optimal for huge numbers?*

- Can you do the addition in-place without using extra space?
  *Hint: Can you avoid the reversed result or use a double-ended queue?*

- How does your solution handle negative numbers?
  *Hint: The problem only allows non-negative inputs, but what if signed integers were allowed?*

### Summary
We used the **digit-by-digit addition** coding pattern, a common technique for problems requiring manipulating very large numbers as arrays. This avoids integer overflow and is widely used in problems like “Add One to Number,” “Multiply Strings,” and linked-list addition. The pattern is efficient and intuitive for base-10 arithmetic on array-represented integers.

### Tags
Array(#array), Math(#math)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Plus One(plus-one) (Easy)
- Add Binary(add-binary) (Easy)
- Add Strings(add-strings) (Easy)