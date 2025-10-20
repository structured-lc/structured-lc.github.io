### Leetcode 2121 (Medium): Intervals Between Identical Elements [Practice](https://leetcode.com/problems/intervals-between-identical-elements)

### Description  
Given an integer array `arr`, for each index \( i \), compute the sum of the absolute differences between \( i \) and every other index \( j \) such that `arr[i] == arr[j]` and \( i \neq j \).  
Return an array where each element at index \( i \) is this sum for `arr[i]`.  
In other words, for every index \( i \), find all indices with the same value as `arr[i]` and sum up their distances to \( i \):  
Output[i] = sum over all \( j \) where `arr[i] == arr[j] and i \neq j` of |i - j|.

### Examples  

**Example 1:**  
Input: `arr = [2,1,3,1,2,3,3]`  
Output: `[4,2,7,2,4,4,5]`  
*Explanation: For the first '2' at index 0, other '2's are at index 4 (|0-4|=4). So output=4.  
For the second '1' at index 1, another '1' is at index 3 (|1-3|=2). For the three '3's at indices 2,5,6:  
- index 2: |2-5|+|2-6|=3+4=7  
- index 5: |5-2|+|5-6|=3+1=4  
- index 6: |6-2|+|6-5|=4+1=5*

**Example 2:**  
Input: `arr = [10,5,10,10]`  
Output: `[5,0,3,4]`  
*Explanation: '10's are at indices 0,2,3.  
- index 0: |0-2|+|0-3|=2+3=5  
- index 2: |2-0|+|2-3|=2+1=3  
- index 3: |3-0|+|3-2|=3+1=4  
The '5' appears only once so output[1]=0.*

**Example 3:**  
Input: `arr = [1,2,3]`  
Output: `[0,0,0]`  
*Explanation: All elements unique, so every output is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:** For each element, scan through the whole array, sum distances to every identical value. Time: O(n²). Not scalable for n up to 10⁵.
- **Optimization:** Precompute, for each unique value, all its indices.  
  For each set of indices, efficiently calculate for each position the total distance to the other positions.
- For a sorted list of positions [i₀, i₁, ..., iₖ], the key observation: the sum of distances from iⱼ to all others can be built up incrementally.  
  - Using prefix sums, we can, for each position, know how many elements are to its left and right,  
    and with running sums, compute left and right interval sums in O(1).
- Implement by:
  - Collecting all index lists per value.
  - For each index list:
      - Sort indices ascending order.
      - Precompute prefix sums.
      - For each index, sum of left intervals: current index × count_left - left_prefix_sum  
      - Sum of right intervals: right_prefix_sum - current index × count_right  
      - Sum both for answer
- This reduces total time to O(n) for collection and computation.

### Corner cases to consider  
- Empty input array: output should be []
- All unique elements: output all 0s
- All identical elements: each index has n-1 terms, symmetric
- Two elements with the same value: edge case with minimal pair
- Negative numbers or large numbers in input
- Single element

### Solution

```python
def getDistances(arr):
    # Step 1: Map each value to all its indices
    from collections import defaultdict
    index_dict = defaultdict(list)
    for i, val in enumerate(arr):
        index_dict[val].append(i)
    
    # Output array
    n = len(arr)
    res = [0] * n
    
    # Step 2: For each group of indices
    for idxs in index_dict.values():
        m = len(idxs)
        # prefix sums
        prefix = [0] * (m + 1)
        for j in range(m):
            prefix[j+1] = prefix[j] + idxs[j]
        
        for j in range(m):
            # count left and right
            leftCnt = j
            rightCnt = m - j - 1
            # Left interval: idxs[j] × leftCnt - prefix[leftCnt]
            leftSum = idxs[j] * leftCnt - prefix[leftCnt]
            # Right interval: (prefix[m] - prefix[j+1]) - idxs[j] × rightCnt
            rightSum = (prefix[m] - prefix[j+1]) - idxs[j] * rightCnt
            res[idxs[j]] = leftSum + rightSum
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
    - Each index only processed twice: once to build dict, once to compute answers. All prefix sums and loops are over total n indices.
- **Space Complexity:** O(n).  
    - Space for the index dict, prefix sums, and result array. All at most O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is updated frequently?  
  *Hint: How could you efficiently update intervals after insert or remove? Think about dynamic index structures.*

- Can you solve this for a multi-dimensional array or grid?  
  *Hint: How would you generalize the distance definition?*

- What if instead of sum, you needed the minimum or maximum interval?  
  *Hint: What’s the trick for min/max instead of sum of distances?*

### Summary
This problem uses the prefix sum pattern to efficiently aggregate distances in grouped indices.  
The process is: **group → sort → prefix sum → interval aggregation** per element.  
It’s a classic case of "group-by-then-process," common in tasks that ask for all relationships within identical elements, such as: subarray sums by value, minimal movement grouping, or k-sum techniques.  
Mastery of prefix sums, group mapping, and efficient aggregation is broadly useful in interviews for reducing O(n²) tasks to O(n).


### Flashcard
For each unique value, precompute all indices; use prefix sums to compute total distances for each occurrence in O(n).

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
- Continuous Subarray Sum(continuous-subarray-sum) (Medium)