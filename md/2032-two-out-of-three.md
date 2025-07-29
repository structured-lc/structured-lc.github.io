### Leetcode 2032 (Easy): Two Out of Three [Practice](https://leetcode.com/problems/two-out-of-three)

### Description  
Given three integer arrays, return a list of **distinct** values that appear in **at least two** out of the three arrays.  
Put simply: take all the values you see that are present in at least two of the arrays—no duplicates allowed in your answer.  
Order doesn't matter in the output.

### Examples  

**Example 1:**  
Input: `nums1 = [1,1,3,2]`, `nums2 = [2,3]`, `nums3 = [3]`  
Output: `[3,2]`  
*Explanation: 3 is in all three arrays, and 2 is in nums1 and nums2. Both appear in at least two arrays.*

**Example 2:**  
Input: `nums1 = [3,1]`, `nums2 = [2,3]`, `nums3 = [1,2]`  
Output: `[2,3,1]`  
*Explanation: 2 is in nums2 and nums3, 3 is in nums1 and nums2, 1 is in nums1 and nums3—all appear in at least two arrays.*

**Example 3:**  
Input: `nums1 = [1,2,2]`, `nums2 = [4,3,3]`, `nums3 = [5]`  
Output: `[]`  
*Explanation: No value appears in at least two arrays, so the answer is empty.*

### Thought Process (as if you’re the interviewee)  
First, for any value to qualify, it should appear in at least two arrays.  
- **Initial idea (brute force):** For each possible integer (from 1 to 100 due to constraints), check if it occurs in at least two of the three arrays. This can be done by scanning each array—this works but can be inefficient if arrays are large or unbounded.
- **Improve (using sets):** Since each array may contain duplicates, it's best to convert each to a set to avoid counting repeated values within a single array.
- **Track appearances:**  
  - Use a dictionary (or array, since numbers only go from 1 to 100) to count in how many arrays each value appears (not total occurrences).
  - Increment for each array in which a value appears.
  - Finally, collect values that are present in at least two arrays.
- **Why this works:**  
  - No double-counting: each value contributes at most 1 per array.
  - Constant extra space (only integers 1..100).
  - Fast to implement and clear logic.

### Corner cases to consider  
- All arrays empty (shouldn't happen due to constraints, but good to think about).
- Value occurs multiple times in one array: should only count as 1 for that array.
- Values that are only in one array.
- All arrays completely disjoint.
- Arrays having the same numbers.
- Arrays have overlapping values in pairwise combinations.
- Arrays with minimum or maximum size/values.

### Solution

```python
def twoOutOfThree(nums1, nums2, nums3):
    # Step 1: Use sets to remove duplicates from each array
    set1 = set(nums1)
    set2 = set(nums2)
    set3 = set(nums3)
    
    # Step 2: Count how many sets each number appears in
    counts = {}  # key: number, value: count of sets it appears in
    
    for num in set1:
        counts[num] = counts.get(num, 0) + 1
    for num in set2:
        counts[num] = counts.get(num, 0) + 1
    for num in set3:
        counts[num] = counts.get(num, 0) + 1
    
    # Step 3: Any number appearing in at least two sets goes to result
    result = []
    for num, count in counts.items():
        if count >= 2:
            result.append(num)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n₁ + n₂ + n₃)  
  Where n₁, n₂, n₃ are the lengths of nums1, nums2, nums3.  
  - Each array is traversed once to make a set.  
  - Each set is traversed once to update counts.
- **Space Complexity:** O(1)  
  - Because numbers are limited (1 ≤ num ≤ 100), the dictionary never grows beyond 100 entries.
  - Sets for each array take at most 100 elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if now the possible values aren’t between 1 and 100, but can be any integer (including negatives and large values)?  
  *Hint: Using a dictionary instead of an array suffices, but now space isn’t truly constant.*

- Could you do this if you could not use extra space for sets or dictionaries?  
  *Hint: Challenge is harder—think about using sorts or bit tricks, but not ideal for interview.*

- How would you generalize this if you had k input arrays instead of exactly three?  
  *Hint: Adjustable loop— just loop through all sets, counting occurrences.*

### Summary
This problem uses the *frequency mapping/presence counting* pattern: for each unique input value, track in how many distinct input groups (not total counts) it appears.  
Using set and dictionary data structures ensures the correct handling of duplicates and keeps the code simple and readable.  
This approach generalizes well to any "present in at least k out of N groups" style tasks and is common in interview questions involving array/category intersection.