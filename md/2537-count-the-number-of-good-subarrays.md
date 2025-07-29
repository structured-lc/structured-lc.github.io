### Leetcode 2537 (Medium): Count the Number of Good Subarrays [Practice](https://leetcode.com/problems/count-the-number-of-good-subarrays)

### Description  
Given an integer array **nums** and an integer **k**, count how many subarrays of **nums** are 'good'.  
A subarray is 'good' if it contains **at least k distinct pairs of indices (i, j)** (0 ≤ i < j < subarray length) such that nums[i] == nums[j].  
Return the total number of good subarrays.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1,1,1], k = 10`  
Output: `1`  
*Explanation: The only subarray covering all elements ([1,1,1,1,1]) has 10 equal pairs: (0,1), (0,2), (0,3), (0,4), (1,2), (1,3), (1,4), (2,3), (2,4), (3,4).*

**Example 2:**  
Input: `nums = [3,1,4,3,2,2,4], k = 2`  
Output: `4`  
*Explanation: The good subarrays are: [3,1,4,3], [3,1,4,3,2], [3,1,4,3,2,2], [1,4,3,2,2]. Each contains ⩾2 equal pairs.*

**Example 3:**  
Input: `nums = [1,2,3], k = 1`  
Output: `0`  
*Explanation: All elements are unique so there are no pairs with equal values in any subarray.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to check every possible subarray and, for each, count the number of equal pairs. For array length n, this results in O(n³) time: O(n²) subarrays × O(n) for each subarray, since counting pairs naively is O(n).

To optimize, notice that we only care when a subarray contains at least k equal pairs.  
We can use a sliding window approach with a hash map (dictionary) that tracks the count of each number.  
- For each right pointer, we add to the pair count by how many times we've already seen nums[right] (since any previous occurrence forms a new pair).
- We move the left pointer rightward, shrinking the window, until the number of pairs in our window drops below k.

For every window where the pair count is at least k, **all substrings starting from left to the end at right are also valid,** so we can add left to the answer count at each step.  
This reduces the problem to O(n) with a hash map, since both pointers traverse the array only once.

This is a typical sliding window with counting problem.  
Trade-off: This algorithm provides optimal time complexity, with a hash map for extra storage.

### Corner cases to consider  
- Empty array (`nums = []`), `k = 0` or `k > 0`
- `k` larger than the total possible pairs (should return 0)
- All elements equal
- All elements unique
- `k = 0` (interpretation: every subarray is good)
- Very large values of `n`

### Solution

```python
def countGood(nums, k):
    # Create a frequency dictionary to count occurrences in current window
    freq = {}
    left = 0
    pairs = 0
    ans = 0
    
    # Traverse with the right pointer
    for right in range(len(nums)):
        # If nums[right] is already in current window, every occurrence forms a new pair
        cnt = freq.get(nums[right], 0)
        pairs += cnt
        
        # Increment count for nums[right]
        freq[nums[right]] = cnt + 1
        
        # While current window has at least k pairs, try to shrink from the left
        while pairs >= k:
            # All subarrays from left to right are valid now
            ans += len(nums) - right
            # Remove nums[left]; update pairs
            freq[nums[left]] -= 1
            pairs -= freq[nums[left]]
            left += 1
            
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each `right` and `left` pointer advances at most n times — both pointers only move forward. All other operations are O(1) on average (hash map/dictionary amortized).
- **Space Complexity:** O(n).  
  For the hash map used to count occurrences: in the worst case, all elements may be unique, requiring up to n space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the length of the shortest good subarray, not just the count?  
  *Hint: Store length every time you reach pairs ≥ k and track the minimal one found.*

- How would you modify your approach if you needed to count exactly k pairs, not at least k?  
  *Hint: You may need two sliding windows—one for at least k and one for at least k+1, and take the difference.*

- Can this algorithm be adapted for updates or streaming input?  
  *Hint: Consider maintaining counts incrementally; online prefix sum or further optimized data structures may be required.*

### Summary

We used a classic **sliding window + hash map (counting)** approach, efficiently tracking pair formation as the window expands and contracts.  
This pattern is widely applicable in counting subarrays/substrings with frequency or pair constraints, e.g., "at most K different characters," "longest substring with at least K repetitions," and others.  
The technique provides linear performance, optimal for large datasets and real-time analytics.