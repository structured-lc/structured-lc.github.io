### Leetcode 2197 (Hard): Replace Non-Coprime Numbers in Array [Practice](https://leetcode.com/problems/replace-non-coprime-numbers-in-array)

### Description  
Given an array of positive integers, repeatedly find any two **adjacent** numbers that are **non-coprime** (i.e., GCD(x, y) > 1), remove both, and insert their **LCM** at their position. Continue until no adjacent non-coprime pairs remain. Return the resulting array.  
Non-coprime means the two numbers have a GCD greater than 1. The LCM is their least common multiple.  
This process can be done in any order, but the final result will always be the same due to the properties of GCD and LCM.

### Examples  

**Example 1:**  
Input: `[6, 4, 3, 2, 7, 6, 2]`  
Output: `[12, 7, 6]`  
*Explanation:*
- 6 and 4 are non-coprime → Replace with LCM(6,4)=12 → `[12,3,2,7,6,2]`
- 3 and 2 are coprime, skip.
- 7 and 6 are coprime, skip.
- 6 and 2 are non-coprime → Replace with LCM(6,2)=6 → `[12,3,2,7,6]`
- Now, no consecutive non-coprime pairs left.

**Example 2:**  
Input: `[2, 2, 1, 1, 3, 3, 3]`  
Output: `[2,1,1,3]`  
*Explanation:*
- 2 and 2 are non-coprime → Replace with 2 → `[2,1,1,3,3,3]`
- 1 and 1 are coprime, skip.
- 3 and 3 are non-coprime → Replace with 3 → `[2,1,1,3,3]`
- 3 and 3 are non-coprime → Replace with 3 → `[2,1,1,3]`

**Example 3:**  
Input: `[5,17,100,11]`  
Output: `[5,17,100,11]`  
*Explanation:*
- No two adjacent numbers have GCD > 1. The array does not change.

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to scan the array and, whenever we find adjacent non-coprime numbers, replace them with their LCM and repeat. However, after merging, new opportunities to merge may appear with prior elements. Naively, this can be very inefficient due to rescanning the array repeatedly.

A **stack approach** is optimal here:
- Traverse the array from left to right.
- For each number, push it onto a stack (which contains the current result).
- While the stack top and the new number are non-coprime, replace the top with the LCM and try to merge again with the new top.
- This way, any chainable merges are resolved immediately, and we only move forward.
- This mimics the repeated adjacent merging required by the problem but ensures efficiency by only revisiting where needed.

Trade-off:  
This approach is efficient, avoids repeated full array scans, and uses extra space for the stack (but not more than O(n)). The merging steps are quick since consecutive merges only go back as far as needed.

### Corner cases to consider  
- Empty array → should return `[]`
- No adjacent non-coprime pairs (array of primes, for example)
- All elements are identical (full merge to one element)
- Every pair in the array is coprime (no merges)
- Large values that could overflow — need to handle multiplication safely and check that LCMs do not exceed constraints
- Array of length 1

### Solution

```python
def replaceNonCoprimes(nums):
    # Helper function to compute gcd
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    # Helper function to compute lcm safely
    def lcm(a, b):
        return a * b // gcd(a, b)

    stack = []
    for num in nums:
        stack.append(num)
        # Continuously merge while the last two elements are non-coprime
        while len(stack) >= 2:
            x = stack[-1]
            y = stack[-2]
            g = gcd(x, y)
            if g == 1:
                break
            # Replace the last two with their lcm
            stack.pop()
            stack[-1] = lcm(y, x)
    return stack
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log (U)),  
  where U is the max number in the array (≤ 1e8).  
  Each number might trigger multiple merges, but every merge strictly reduces the number of elements in the stack, and LCM/GCD run in log time on numbers up to 10⁸.
- **Space Complexity:** O(n)  
  At most, the stack will have as many elements as the input array size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you do the same algorithm in place without extra space?  
  *Hint: Carefully manage the input array as a stack and update indices as you go.*

- Can you return the number of merge operations rather than the resulting array?  
  *Hint: Add a counter to increase each time a merge is performed during your stack operation.*

- What if the numbers exceed 10⁸ — how would you avoid integer overflow in LCM calculation?  
  *Hint: Use arbitrary-precision arithmetic, or modify how you check for overflow before multiplying.*

### Summary
The optimal approach uses a stack to efficiently combine adjacent non-coprime numbers by merging them immediately as we traverse. This is a classic **adjacent merging / monotonic stack** pattern, used when local modifications can affect prior results, but resolving merges as you build up the solution makes the problem tractable. Similar reasoning appears in problems involving the removal or merging of adjacent elements if a condition is met.

### Tags
Array(#array), Math(#math), Stack(#stack), Number Theory(#number-theory)

### Similar Problems
- Remove All Adjacent Duplicates in String II(remove-all-adjacent-duplicates-in-string-ii) (Medium)
- Number of Pairs of Interchangeable Rectangles(number-of-pairs-of-interchangeable-rectangles) (Medium)
- Split the Array to Make Coprime Products(split-the-array-to-make-coprime-products) (Hard)