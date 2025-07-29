### Leetcode 3012 (Medium): Minimize Length of Array Using Operations [Practice](https://leetcode.com/problems/minimize-length-of-array-using-operations)

### Description  
Given an array of positive integers, you may repeatedly perform the following operation any number of times:  
- Pick any two _distinct_ indices \(i\), \(j\) (with nums[i] > 0 and nums[j] > 0).
- Insert nums[i] % nums[j] at the end of the array.
- Delete both nums[i] and nums[j] from the array.

Your task is to compute the **minimum possible length** of the array after performing these operations any number of times (including zero).

### Examples  

**Example 1:**  
Input: `nums = [1,4,3,1]`  
Output: `1`  
*Explanation:*
- Step 1: Pick indices 2 (3) and 1 (4), insert 3 % 4 = 3 → [1,3,1,3] (after deletion: [1,1,3])
- Step 2: Pick indices 1 (1) and 2 (3), insert 1 % 3 = 1 → [1,1,3,1] (after deletion: [1,1])
- Step 3: Pick 0 and 1 (both 1), insert 1 % 1 = 0 → [1,1,0] (after deletion: )
- Now only a single element remains, and it cannot be reduced further.
- Thus, minimum length is 1.

**Example 2:**  
Input: `nums = [5,5,5,5,5]`  
Output: `3`  
*Explanation:*
- All elements are equal (5). Pair up two 5's: 5 % 5 = 0, array shortens by one after each operation.
- After 2 such pairings (using up 4 numbers), array is [5,0,0] (or equivalently, three items).
- Cannot go lower because only three numbers, and further pairings yield new zeros but never reduce below three items.

**Example 3:**  
Input: `nums = [6,2,4]`  
Output: `1`  
*Explanation:*
- Minimum value is 2. All numbers are multiples of 2 (since 6 % 2 = 0, 4 % 2 = 0).
- Pair (6,2): 6 % 2 = 0 → [4,0]
- Pair (4,0): 4 % 0 – but cannot divide by zero, but since 0 is present, array cannot be reduced further.
- However, since all are multiples, final is 1 (array of ).

### Thought Process (as if you’re the interviewee)  
- First, try brute force: simulate every possible removal/pairing, recursively or with BFS.
- Immediately, this explodes: too many combinations after every operation.
- Key: the operation keeps only modulus results, so every value eventually reduces to the minimum (gcd-like process).
- Notice: If all values are divisible by the **minimum element** mᵢ, after repeated modulus all values either become mᵢ or 0.  
- If **any value** in array is **not** a multiple of mᵢ, then we can always create new numbers smaller than mᵢ, getting eventually down to 1 element.
- Else, only numbers in the array will be the minimum mᵢ (and 0). The length can only be reduced by pairing the minimums. For k occurrences of mᵢ, ceil(k/2) elements will remain because we can pair (and reduce) them until at most one is left (rest will be 0s or minimums).
- So:
    - If any x % mᵢ > 0: output 1
    - Else: answer is (count of mᵢ + 1) // 2

### Corner cases to consider  
- All elements are identical
- Array with only one element
- Array contains elements whose gcd is 1 but not all are identical
- Large number of minimums (odd/even case for how many are left after maximal pairings)

### Solution

```python
def minimumArrayLength(nums):
    # Step 1: Find the minimum element 
    mi = min(nums)
    
    # Step 2: Check if any element in nums is not a multiple of minimum
    for x in nums:
        if x % mi != 0:
            # Can always get down to a single element
            return 1
    
    # Step 3: All elements are multiples of minimum
    # The answer is (count of minimum + 1) // 2
    cnt = sum(1 for x in nums if x == mi)
    return (cnt + 1) // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Scans the array once for min, once for verifying modulus, and once for counting min element.
- **Space Complexity:** O(1)  
  Aside from the input, only a fixed number of variables are used.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you prove why the answer is always 1 if any number is not a multiple of the minimum?
  *Hint: Try running the operation repeatedly; what happens if a new, smaller element is introduced?*

- How would you extend this to arrays with zero and negative numbers?
  *Hint: The operation as specified uses positive integers only—how does modulus behave with negatives or zeros?*

- Is finding the GCD related to this operation? How does it connect?
  *Hint: What happens to the array as you keep applying x % y and y % x to all pairs?*

### Summary
This problem reduces to a number theory insight: repeatedly taking modulus eventually will shrink the array to either a single element (if some number isn’t a multiple of the minimum), or to about half as many as minimums (when all are multiples of the minimum).  
Pattern: **Greedy, Min/Mod, Array Reduction.**  
This “keep reducing by modulus” technique frequently arises in combinatorial or number theory problems, especially when the operation mimics some property of the GCD.