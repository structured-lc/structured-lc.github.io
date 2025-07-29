### Leetcode 992 (Hard): Subarrays with K Different Integers [Practice](https://leetcode.com/problems/subarrays-with-k-different-integers)

### Description  
You are given an integer array of length n and an integer K. Your task is to return the number of subarrays (continuous parts of the array) that have exactly K **distinct** integers.  
Think of a subarray as a segment of the original array—order matters and all elements are consecutive. Here, "different" simply means "distinct."

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,2,3]`, `K = 2`  
Output: `7`  
*Explanation: The 7 subarrays with 2 distinct integers are: [1,2], [2,1], [1,2], [2,1,2], [1,2,3], [2,3], [1,2].*

**Example 2:**  
Input: `nums = [1,2,1,3,4]`, `K = 3`  
Output: `3`  
*Explanation: The subarrays are: [1,2,1,3], [2,1,3], [1,3,4]. All have exactly 3 distinct numbers.*

**Example 3:**  
Input: `nums = [1,1,1,1,1]`, `K = 1`  
Output: `15`  
*Explanation: Every nonempty subarray consists entirely of 1, so there are ⌊n × (n + 1) / 2⌋ = 15 such subarrays with exactly 1 distinct integer.*

### Thought Process (as if you’re the interviewee)  

Start with the brute-force approach:  
- For every possible subarray, count the number of distinct integers.
- If the number is K, increment a result counter.

However, this is very slow — O(n³) for counting unique elements for every subarray, or O(n²) if we optimize unique counting with a frequency map rebuilt per subarray. Not practical for large arrays.

Optimization:
- Notice that "subarrays with exactly K" = "subarrays with at most K distinct" − "subarrays with at most K-1 distinct".
- The "at most K" problem can be efficiently solved by two-pointer (sliding window) method using a hashmap to track the count of each integer in the window.
- By computing count_at_most(K) − count_at_most(K−1), we get the desired result.
- This approach is O(n) in time and space, since each pointer moves at most n times, and our frequency map contains at most n unique numbers.

Why is this optimal?
- We avoid recomputation and brute-force checking each subarray.
- The sliding window pattern is a standard solution wherever "subarrays with at most K ... " constraints arise.

### Corner cases to consider  
- K > length of nums (no valid subarrays)
- Empty input array: nums = []
- All array elements are same (test for multiple contiguous substrings)
- K = 1 or K = length of nums
- Duplicate values, mixed small and large numbers

### Solution

```python
def subarraysWithKDistinct(nums, K):
    # Helper: Counts no. of subarrays with at most k distinct integers
    def atMost(k):
        count = {}
        result = 0
        left = 0
        # Right pointer expands window
        for right in range(len(nums)):
            # Add number to window
            count[nums[right]] = count.get(nums[right], 0) + 1
            # If window has more than k unique, shrink from left
            while len(count) > k:
                count[nums[left]] -= 1
                if count[nums[left]] == 0:
                    del count[nums[left]]
                left += 1
            # Every (left, right) window ending at right with ≤ k uniques
            result += right - left + 1
        return result

    # Exactly K = atMost(K) - atMost(K-1)
    return atMost(K) - atMost(K - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is added and removed from our frequency map at most once (twice overall), resulting in linear time.

- **Space Complexity:** O(n)  
  The frequency map could theoretically store all n unique elements in the array if all numbers are distinct.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the algorithm change if "exactly K distinct" was replaced by "at least K distinct"?  
  *Hint: The difference trick may not apply, would need to scan or combine sliding windows differently.*

- Can you modify this approach if the array is not integers, but strings or generic objects?  
  *Hint: Hashmap/frequency tracking works for hashable types, so only the window tracking method changes slightly.*

- How would you count for "subarrays where the maximum/minimum is exactly K"?  
  *Hint: Sliding windows also apply, but window boundaries depend on max/min, not distinct count.*

### Summary
This is a classic **sliding window + hashmap** problem for "subarrays with at most K ...", optimized by using the difference pattern to get counts for "exactly K".  
The approach generalizes to a variety of related substring/subarray problems and is a powerful pattern for interviews.  
Commonly reused for problems counting subarrays with unique, at most/at least constraints, and more.