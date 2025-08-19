### Leetcode 3151 (Easy): Special Array I [Practice](https://leetcode.com/problems/special-array-i)

### Description  
Given an array of integers, an array is called **special** if every pair of adjacent elements has different parity: that is, one is even and the other is odd.  
Your task is to determine if the input array is special by this definition, returning `True` if so, otherwise `False`.  
(If there is only one element, the array is always special.)

### Examples  

**Example 1:**  
Input: `nums = [1]`  
Output: `True`  
*Explanation: There is only one element, so the requirement trivially holds.*

**Example 2:**  
Input: `nums = [2,1,4]`  
Output: `True`  
*Explanation: Adjacent pairs are (2,1) and (1,4). 2 is even, 1 is odd; 1 is odd, 4 is even. Both pairs have different parity.*

**Example 3:**  
Input: `nums = [4,3,1,6]`  
Output: `False`  
*Explanation: Pairs: (4,3): different parity. (3,1): both odd (same parity). As soon as a pair has same parity, output is `False`.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  Check every adjacent pair in the array, validating they have different parity (one is even, one is odd).  
  Iterate from left to right, for indices `i` and `i+1`, check `nums[i] % 2 != nums[i+1] % 2`. If all pairs pass, return `True`. Otherwise, return `False`.
- **Optimization**:  
  Since the brute-force already processes each element once (except the last), there’s no further optimization needed.  
  **Trade-off**: Time complexity is O(n), space is O(1). Easy to read, robust, and fits the constraints (n ≤ 100).

### Corner cases to consider  
- Array of length 1: always special
- Array with all the same parity (e.g., [2,2,2]): should return False for length ≥ 2
- Array where only the last two elements have the same parity
- Array with alternating even-odd
- Array of two elements, different parity (should return True), same parity (should return False)

### Solution

```python
def isArraySpecial(nums):
    # A single-element array is always special
    if len(nums) == 1:
        return True

    # Iterate over each adjacent pair and compare parity
    for i in range(len(nums) - 1):
        # If both are even or both are odd, array is not special
        if nums[i] % 2 == nums[i + 1] % 2:
            return False
    # All pairs pass the check, array is special
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We iterate once through all n-1 adjacent pairs to check parity.
- **Space Complexity:** O(1)  
  Only constant extra space for loop variables; no auxiliary arrays, recursion, or stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to check if at least K adjacent pairs have different parity?  
  *Hint: Track a counter and compare to K at the end.*

- How would your logic change if the array could contain negative integers?  
  *Hint: The parity rule using modulus remains valid with negatives.*

- What if "special" means at least one pair must have the same parity?  
  *Hint: Flip the check—return True if you find such a pair.*

### Summary
This problem uses the **adjacent pair property check** pattern—linear scan over adjacent elements, testing a simple relation (here: parity). This technique applies broadly: "peak" finding, checking monotonicity, and more. It’s simple, efficient, and robust for small-to-medium arrays, ideal for real interviews and similar problems involving pairwise relations.

### Tags
Array(#array)

### Similar Problems
