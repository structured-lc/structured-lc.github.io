### Leetcode 1300 (Medium): Sum of Mutated Array Closest to Target [Practice](https://leetcode.com/problems/sum-of-mutated-array-closest-to-target)

### Description  
Given an integer array **arr** and a target integer **target**, find an integer **value** such that when all elements in **arr** greater than **value** are replaced by **value**, the sum of the mutated array is as close as possible (in absolute difference) to **target**.  
If there is a tie (i.e. several values produce equally close results), return the **minimum** such integer.  
The returned integer does **not** necessarily have to be an element of **arr**.

### Examples  

**Example 1:**  
Input: `arr = [4,9,3], target = 10`  
Output: `3`  
Explanation: Using 3, arr becomes [3,3,3]. The sum is 9 (|9-10| = 1), and it's the closest possible.

**Example 2:**  
Input: `arr = [2,3,5], target = 10`  
Output: `5`  
Explanation: Using 5, arr = [2,3,5] (unchanged). The sum is 10 (|10-10| = 0), which matches the target exactly.

**Example 3:**  
Input: `arr = [60864,25176,27249,21296,20204], target = 56803`  
Output: `11361`  
Explanation: When using 11361, all values greater than 11361 are set to 11361, yielding a sum closest to 56803.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  Try each possible value from 0 up to the maximum in arr. For each, create the mutated array, compute its sum, and track which value gives the smallest absolute difference from target. However, this is not efficient for large arrays and values.

- **Observation:**  
  The mutated sum as a function of `value` is monotonic non-decreasing. If value increases, the mutated sum won't decrease.

- **Optimization:**  
  Use **binary search** over the range [0, max(arr)]. For any given guess of value, compute the mutated sum by capping all arr[i] at value. Depending on whether the sum is below or above target, adjust the search range.  
  At the end, check both the found value and value-1, since the closest may be on either side.

- **Why binary search?**  
  Binary search reduces time from O(max(arr) \* n) to O(n \* log(max(arr))), easily acceptable for the constraints.

### Corner cases to consider  
- Array of one element (e.g. arr = [1], any target).
- Arr contains duplicate values (all equal, all unique).
- Target much larger than sum(arr): answer is max(arr).
- Target much smaller than min(arr): answer is ⌊target / len(arr)⌋.  
- If mutated sum equals target at multiple values, prefer the smallest value.
- Empty array: (not allowed by constraints, but good to check).
- Arr already sums to target.

### Solution

```python
def findBestValue(arr, target):
    # Helper function to compute the mutated sum for a given limit value
    def mutated_sum(value):
        # Replace all arr[i] > value by value and sum up
        total = 0
        for num in arr:
            if num > value:
                total += value
            else:
                total += num
        return total

    left, right = 0, max(arr)
    answer = 0
    min_diff = float('inf')

    while left <= right:
        mid = (left + right) // 2
        curr_sum = mutated_sum(mid)
        diff = abs(curr_sum - target)
        if diff < min_diff or (diff == min_diff and mid < answer):
            answer = mid
            min_diff = diff
        if curr_sum < target:
            left = mid + 1
        else:
            right = mid - 1

    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log(max(arr)))  
  - For each binary search step, we scan `arr` to compute the mutated sum (O(n)).
  - Binary search runs for log(max(arr)) iterations.

- **Space Complexity:** O(1)  
  - Only a fixed number of variables are used; mutated_sum uses no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if arr is **extremely large** (e.g. millions of elements)?  
  *Hint: Can you preprocess or use prefix sums for efficiency?*

- How would the approach change if arr is **sorted**?  
  *Hint: Precompute prefix sums and use binary search inside binary search.*

- How would you handle finding **all such values** (not just the smallest) that result in minimum difference?  
  *Hint: Track all candidate values where abs(mutated_sum - target) is minimized.*

### Summary
The approach is a combination of **binary search** and an **accumulative sum** method that exploits the monotonicity of the mutated sum function. Binary search efficiently narrows down candidate values, making this a typical example of "search on answer" and "greedy cap" patterns — useful for problems involving range-based optimization criteria. This can be generalized to other problems where modifying numbers under some constraint yields an optimal total.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
