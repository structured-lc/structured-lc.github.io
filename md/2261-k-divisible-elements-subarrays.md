### Leetcode 2261 (Medium): K Divisible Elements Subarrays [Practice](https://leetcode.com/problems/k-divisible-elements-subarrays)

### Description  
Given an integer array **nums** and two integers **k** and **p**, return the number of **distinct subarrays** such that each subarray contains **at most k elements divisible by p**.  
A subarray is a contiguous non-empty sequence of elements, and distinctness is defined by the sequence of values, not their positions.

### Examples  

**Example 1:**  
Input: `nums = [2,3,3,2,2], k = 2, p = 2`  
Output: `11`  
*Explanation: All unique subarrays with at most 2 elements divisible by 2 are:  
[2], [3], [3], [2,3], [3,3], [3,2], [2,3,3], [3,3,2], [3,2,2], [2,3,3,2], [3,3,2,2]
(These are unique as subarrays, even if values repeat elsewhere)*

**Example 2:**  
Input: `nums = [1,2,3,4], k = 1, p = 2`  
Output: `7`  
*Explanation: Valid subarrays are:  
[1], [2], [3], [4], [1,2], [2,3], [3,4]
(Any longer subarray would contain >1 element divisible by 2, violating k = 1)*

**Example 3:**  
Input: `nums = [1,1,1], k = 0, p = 2`  
Output: `6`  
*Explanation: All subarrays are allowed because none have any element divisible by 2.  
[1], [1], [1], [1,1], [1,1], [1,1,1]
(There are 6 unique subarrays total)*

### Thought Process (as if you’re the interviewee)  
First, brute force:  
- Generate every possible subarray (O(n²) total).
- For each subarray, count how many elements are divisible by p.
- Only consider the subarray if that count ≤ k.
- To ensure every subarray is only counted once, store each valid subarray in a set.

Problems with brute force:  
- Storing every subarray as a list in a set is slow; converting lists to tuples or using a hashable representation solves that.
- O(n³): O(n²) subarrays × O(n) counting per subarray. Too slow for large arrays.

To optimize:  
- Since we need all unique subarrays up to size n, and each only if it contains ≤k divisible-by-p elements, we can:
    - For each starting index i:
        - Walk right with an end index j:
            - Keep a running count of divisible elements.
            - Stop extending if count exceeds k.
            - Store subarrays as tuples in a set for uniqueness.
- This reduces unnecessary checks, remains O(n²) but with less overhead, and is feasible for n ≤ 200.

Trade-offs:
- The set may use significant space if there are tons of unique subarrays, but correctness and simplicity are more important for this size.  
- Advanced: Rolling hash or Trie to further optimize storage, but the standard set+tuple approach is clear and justified.

### Corner cases to consider  
- nums is empty (though by problem constraints likely not given; still, code should be robust).
- k = 0 (no element in subarray can be divisible by p).
- p does not actually divide any elements (all subarrays will be valid).
- All elements are divisible by p (subarrays larger than k will be invalid).
- Duplicate elements (remember: count subarrays by value sequence, not by pointer).
- nums contains only one element.
- nums contains all unique elements.
- n is at maximum (ensure O(n²) is acceptable).

### Solution

```python
def countDistinct(nums, k, p):
    # Set to store unique subarrays as tuples for hashing
    unique_subarrays = set()
    n = len(nums)
    
    for start in range(n):
        count_divisible = 0
        subarray = []
        for end in range(start, n):
            # Add current element to subarray
            subarray.append(nums[end])
            # Count if divisible by p
            if nums[end] % p == 0:
                count_divisible += 1
            # If more than k divisible elements, stop extending
            if count_divisible > k:
                break
            # Convert list to tuple to add to set for uniqueness
            unique_subarrays.add(tuple(subarray))
    return len(unique_subarrays)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each start index, inner loop extends to n, so upper bound is (n(n+1))/2 subarrays.  
  For each, tuple conversion is O(l), but total number of tuples is bounded by O(n²).  
- **Space Complexity:** O(n² \* m), where m is average subarray length, due to storing all unique subarrays as tuples in a set.

### Potential follow-up questions (as if you’re the interviewer)  

- How to optimize for space if nums is very large?  
  *Hint: Use a Trie or rolling hash to store subarrays efficiently without materializing all of them.*

- What if k or p changes frequently, how would you modify your approach to answer multiple queries quickly?  
  *Hint: Consider pre-processing with prefix sums or DP, or index structures.*

- Suppose "at least k elements divisible by p" is required instead of "at most k", how would your solution change?  
  *Hint: Adjust the break logic in the inner loop and modify counting constraints.*

### Summary
The approach is based on generating all possible subarrays (using start and end indices) and using a set for uniqueness, with an early break if the subarray violates the constraint (more than k divisible by p).  
This is a classic "find all unique subarrays with property" pattern, often used with sets or Tries for uniqueness, and early loop termination for efficiency.  
This sliding window+set approach is reusable in other problems with similar subarray constraints.