### Leetcode 220 (Hard): Contains Duplicate III [Practice](https://leetcode.com/problems/contains-duplicate-iii)

### Description  
Given an integer array **nums**, and two integers **k** and **t**, determine if there exist two distinct indices *i* and *j* in the array such that:
- The absolute difference between their indices is at most **k** (|i - j| ≤ k)
- The absolute difference between their values is at most **t** (|nums[i] - nums[j]| ≤ t)

The goal is to check whether there are any "almost duplicate" pairs within a certain index and value difference window. Efficiently finding such pairs is key.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,1], k = 3, t = 0`  
Output: `True`  
*Explanation: nums=1 and nums[3]=1. Indices: |0-3|=3 ≤3, Values: |1-1|=0 ≤0.*

**Example 2:**  
Input: `nums = [1,0,1,1], k = 1, t = 2`  
Output: `True`  
*Explanation: nums[2]=1 and nums[3]=1. Indices: |2-3|=1 ≤1, Values: |1-1|=0 ≤2.*

**Example 3:**  
Input: `nums = [1,5,9,1,5,9], k = 2, t = 3`  
Output: `False`  
*Explanation: All duplicates are farther than k=2 or values differ by > t=3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Compare all pairs (i, j) such that 0 ≤ i < j < n, and check if both |i-j| ≤ k and |nums[i] - nums[j]| ≤ t.  
  Time complexity is O(n²), which is too slow for large arrays (up to 2×10⁴).

- **Better idea:**  
  We want, for each index i, to check if there’s any value in indices [i-k, i-1] that is within t of nums[i].  
  Normally, we’d want a data structure to quickly find near values in a "window" of past k indices.

- **Optimal approach (Buckets):**  
  Use a hash map to bucketize numbers, letting each bucket cover a width of t+1.  
  - For each num in nums, compute its bucket using bucket_id = num // (t+1).
  - If the same bucket already contains a number, the difference is ≤ t.
  - Also check the buckets adjacent to the current one, in case of boundary values.
  - Remove numbers that fall outside of the k-sized sliding window (to ensure |i-j| ≤ k).
  This gives O(n) time, with O(k) space.

- **Why buckets?**  
  Ensures no more than one "candidate" per bucket, and neighbors are checked for near-misses.

### Corner cases to consider  
- Empty array.
- t < 0 or k < 0 (should immediately return False).
- Negative numbers in nums.
- Duplicate numbers at index distance > k (should not match).
- Large or small values in nums (handle int boundaries).
- t = 0, which requires *exact* match within distance k.

### Solution

```python
def containsNearbyAlmostDuplicate(nums, k, t):
    if k < 0 or t < 0:
        return False

    bucket = {}
    w = t + 1  # bucket width

    for i, num in enumerate(nums):
        bucket_id = num // w

        # Handle negative numbers correctly (ensure floor division result for negatives)
        if num < 0:
            bucket_id -= 1

        # Check if it's already in this bucket (means abs diff ≤ t)
        if bucket_id in bucket:
            return True
        # Check the neighbor buckets for possible matches
        if (bucket_id - 1 in bucket) and abs(num - bucket[bucket_id - 1]) < w:
            return True
        if (bucket_id + 1 in bucket) and abs(num - bucket[bucket_id + 1]) < w:
            return True

        # Place num in its bucket
        bucket[bucket_id] = num

        # Remove value too old (outside window of k)
        if i >= k:
            old_num = nums[i - k]
            old_bucket_id = old_num // w
            if old_num < 0:
                old_bucket_id -= 1
            del bucket[old_bucket_id]

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each index at most inserts and deletes from the bucket dictionary, all O(1) operations.

- **Space Complexity:** O(k).  
  The bucket map holds at most k+1 entries (the sliding window size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if you only needed to check for exact duplicates within k?
  *Hint: Use a set to track the sliding window.*

- What if numbers could be floating point?
  *Hint: Adjust the bucket logic and beware of precision errors with floats.*

- Could we use a balanced BST or TreeSet? What are trade-offs?
  *Hint: Yes, but insertion/removal becomes O(log k) rather than O(1).*

### Summary
The approach uses the **Bucketing** pattern: mapping values into "buckets" defined by the range t+1 allows efficient near-value checking in O(1).  
Common for problems involving "almost" duplicates or sliding range queries.  
This hash bucket sliding window technique avoids n² time and can be adapted to problems like "Contains Duplicate II" (which is simpler), or for maintaining rolling uniqueness with value tolerances.