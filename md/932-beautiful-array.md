### Leetcode 932 (Medium): Beautiful Array [Practice](https://leetcode.com/problems/beautiful-array)

### Description  
Given an integer **n**, construct any permutation of the integers from **1** to **n** such that for every triplet of indices `i < k < j`, it's never true that `nums[i] + nums[j] = 2 × nums[k]`. In other words, for every pair of positions in the array, **there should not exist** an element directly between them that makes it the arithmetic mean of the two endpoints.  
Return any array that satisfies these properties.   
This array is called a "Beautiful Array."  
Constraints:  
- 1 ≤ n ≤ 1000

### Examples  

**Example 1:**  
Input: `n = 4`  
Output: `[2,1,4,3]`  
*Explanation: One possible "beautiful array". For every i < k < j, it's never true that nums[i] + nums[j] = 2×nums[k].*

**Example 2:**  
Input: `n = 5`  
Output: `[3,1,2,5,4]`  
*Explanation: No element is the average of two others at positions before and after it.*

**Example 3:**  
Input: `n = 1`  
Output: `[1]`  
*Explanation: Trivially beautiful, since only one element exists.*

### Thought Process (as if you’re the interviewee)  
First, I want to clarify that the constraint says every integer from 1 to n must be used exactly once (a permutation).  
- The brute-force approach would be to try all permutations and check the required property for each, but this is obviously infeasible for n up to 1000.  
- Let's look for a clever construction: can we generate a permutation with some recursive or divide & conquer structure such that this property is always satisfied?  

If we recursively split the array into odds and evens—at each recursive call, generate a beautiful array for the first half of the numbers (which map to odds in the bigger array), and another for the second half (which map to evens)—then combine them, it turns out the property is maintained.  
- For `n == 1`, [1] is beautiful.  
- For a general n, recursively generate the beautiful array for ⌊(n+1)/2⌋ (these will correspond to all odds) and for ⌊n/2⌋ (these will be all evens), and scale their values appropriately.  
- When combining, concatenate `odds` then `evens`; the recursive placement prevents the “midpoint” condition from ever being true.  

This constructive approach is both efficient and guaranteed to produce a “beautiful array”.

### Corner cases to consider  
- n = 1 (just [1])
- n = 2 (should work with [1,2] and [2,1])
- Odd versus even n (correct counting and placement)
- Large n (no stack overflow/recursion limit and efficiency)

### Solution

```python
def beautifulArray(n):
    """
    Build the beautiful array recursively:
      - For n == 1: just [1]
      - For general n:
        - Recursively build for odds (map as 2*x-1)
        - Recursively build for evens (map as 2*x)
        - Concatenate odds then evens
    """
    if n == 1:
        return [1]
    # Build odds: beautiful array for ⌊(n+1)/2⌋, mapped as 2x-1
    odds = [2*x - 1 for x in beautifulArray((n + 1) // 2)]
    # Build evens: beautiful array for ⌊n/2⌋, mapped as 2x
    evens = [2*x for x in beautifulArray(n // 2)]
    return odds + evens
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  At each level of recursion, all elements are visited/constructed, and there are log n levels (binary divide). So total work is O(n log n).
- **Space Complexity:** O(n)  
  All recursion is tail recursive; arrays built have total size O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you prove why this construction never violates the "no arithmetic mean" property?  
  *Hint: Can an odd-indexed and even-indexed element combined ever have a midpoint between them also present?*

- Is this the only possible way to generate a beautiful array, or are there multiple valid outputs?  
  *Hint: Try changing the order in which you concatenate or start with different bases.*

- How would you generate *all* possible beautiful arrays for a given n? Is enumeration feasible for large n?  
  *Hint: Is this problem similar to particular combinatorial permutation classes?*

### Summary
We use a **divide-and-conquer constructive algorithm**: recursively split the problem into odds and evens, map and concatenate, to build a permutation with the “no midpoint mean in between” property.  
This is a classic constructive example using recursion and permutation mapping, and is a technique that can also be useful in problems about rearranging sequences to avoid certain patterns (no arithmetic progressions, etc.)