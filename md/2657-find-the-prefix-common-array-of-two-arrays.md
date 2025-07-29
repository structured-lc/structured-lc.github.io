### Leetcode 2657 (Medium): Find the Prefix Common Array of Two Arrays [Practice](https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays)

### Description  
Given two integer arrays **A** and **B** of length *n*, both of which are permutations of numbers from 1 to n (each integer in that range appears exactly once in both arrays), construct a new array **C** of the same length, called the "prefix common array". For each index *i*, **C[i]** equals the count of numbers that have appeared in both **A[0..i]** and **B[0..i]** up to index *i* (inclusive).  
In other words, at each *i*, how many numbers are present in both prefixes (**A[0..i]** and **B[0..i]**)?

### Examples  

**Example 1:**  
Input: `A=[1,3,2,4], B=[3,1,2,4]`  
Output: `C=[0,2,3,4]`  
*Explanation:*
- i=0: A=[1], B=[3], common: none → 0  
- i=1: A=[1,3], B=[3,1], common: {1,3} → 2  
- i=2: A=[1,3,2], B=[3,1,2], common: {1,2,3} → 3  
- i=3: A=[1,3,2,4], B=[3,1,2,4], common: {1,2,3,4} → 4

**Example 2:**  
Input: `A=[2,3,1], B=[3,1,2]`  
Output: `C=[0,1,3]`  
*Explanation:*
- i=0: A=[2], B=[3], common: none → 0  
- i=1: A=[2,3], B=[3,1], common: {3} → 1  
- i=2: A=[2,3,1], B=[3,1,2], common: {1,2,3} → 3

**Example 3:**  
Input: `A=[1], B=[1]`  
Output: `C=[1]`  
*Explanation:*
- i=0: A=[1], B=[1], common: {1} → 1

### Thought Process (as if you’re the interviewee)  
First, I considered the brute-force way: for each *i*, find all elements in A[0..i] and B[0..i], compute their intersection, and count the result.  
This naive approach requires scanning both prefixes for each i, costing O(n²) time.

Next, I realized that because each array is a permutation (every value between 1 and n appears once), we can process both arrays in parallel and track counts for each integer.
- Use two sets (or boolean arrays) to keep track of elements seen so far in A and B.
- For each i, add A[i] and B[i] to their respective sets, then count how many elements are in both sets so far. To do this efficiently, when adding an element to set A, if it already exists in set B (and vice-versa), we mark it as seen in both.
- To speed up, we can use a single occurrences array, and increment when we see a value in A or B. When occurrences for a value reach 2, it's now present in both prefixes, so we increment our prefix common count.

This leads to an O(n) time, O(n) space solution, which is optimal.

### Corner cases to consider  
- n = 1 (single element)
- All elements appear at different positions except last position (common grows only at the end)
- Arrays are already identical (C[i] increases by 1 each time)
- Arrays are completely reversed (common increases gradually)
- n is large (ensure O(n) space/time still works)

### Solution

```python
def findThePrefixCommonArray(A, B):
    n = len(A)
    seenA = set()
    seenB = set()
    result = []
    common_count = 0

    for i in range(n):
        seenA.add(A[i])
        seenB.add(B[i])
        # For current prefix, number is common if it's in both sets
        # But only count each number once
        if A[i] == B[i]:
            # Added the same value from each: only count once
            if A[i] not in (seenA - {A[i]} | seenB - {B[i]}):
                common_count += 1
        else:
            if A[i] in seenB:
                common_count += 1
            if B[i] in seenA and B[i] != A[i]:
                common_count += 1
        result.append(common_count)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We process each index once, checking/adding elements in sets in O(1), no nested loops.
- **Space Complexity:** O(n).  
  At most n elements in each set; and an output of size n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if allowed values aren’t guaranteed to be 1..n or not unique?
  *Hint: Handling duplicates and arbitrary ranges, change your data structure (use dict/set).*

- Can you do this in-place with the output, or optimize further for memory if n is huge?
  *Hint: Only need to track which numbers have been seen—think bitset/boolean array.*

- If you had k arrays, not just two, can you compute the prefix intersection count at each step?
  *Hint: Generalize the tracking mechanism, manage counts per value.*

### Summary
This problem is a two-pointer/prefix set intersection simulation, efficiently solvable by counting how many elements have appeared in both arrays’ prefixes at each step.  
The main coding pattern is **prefix accumulation with set membership tracking**—commonly useful for “count until now” or evolving prefix/statistics queries, especially when working with permutations or unique elements.  
Patterns like this often appear in problems involving running intersection/union, prefix queries, and can be generalized to intervals or other “seen-so-far” statistics.