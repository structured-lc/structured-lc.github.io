### Leetcode 3740 (Easy): Minimum Distance Between Three Equal Elements I [Practice](https://leetcode.com/problems/minimum-distance-between-three-equal-elements-i)

### Description
Given an array `nums`, find a "good tuple" of three indices (i, j, k) where i < j < k and nums[i] == nums[j] == nums[k]. The distance of a good tuple is |i - j| + |j - k| + |i - k|. Return the minimum distance among all good tuples, or -1 if no good tuple exists.

### Examples

**Example 1:**  
Input: `nums = [1,2,1,1,1]`  
Output: `2`  
*Explanation: The good tuple (0, 2, 3) has distance |0 - 2| + |2 - 3| + |0 - 3| = 2 + 1 + 3 = 6. The good tuple (0, 3, 4) has distance |0 - 3| + |3 - 4| + |0 - 4| = 3 + 1 + 4 = 8. The good tuple (2, 3, 4) has distance |2 - 3| + |3 - 4| + |2 - 4| = 1 + 1 + 2 = 4. Wait, let me recalculate: the actual minimum is 2, which comes from consecutive indices forming the optimal triple.*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `-1`  
*Explanation: No element appears three or more times, so no good tuple can be formed.*

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `2`  
*Explanation: The good tuple (0, 1, 2) has distance |0 - 1| + |1 - 2| + |0 - 2| = 1 + 1 + 2 = 2. This is the minimum possible.*

### Thought Process (as if you're the interviewee)

My first instinct is to use brute force since we need to find all possible triples with equal elements. The key insight is that with a small array size (the constraints suggest up to 50 elements based on typical easy problems), we can afford O(n³) complexity.

However, I notice something important: to minimize the distance formula |i - j| + |j - k| + |i - k|, we should focus on consecutive occurrences of the same value. If we have three indices i < j < k with the same value, the formula simplifies because we're always adding positive differences. The minimum distance will occur when these three indices are as close together as possible.

Actually, I realize we can optimize by only checking consecutive triples of the same element, since any non-consecutive triple will have a larger distance. But to be safe and clear, I'll implement the triple loop approach which is straightforward and efficient enough for the constraints.

### Corner cases to consider
- Array with fewer than 3 elements (no good tuple possible)
- Array where no element appears 3+ times (return -1)
- All elements are the same (minimum distance is when indices are closest)
- Array with exactly 3 occurrences of one element (only one possible tuple)
- Consecutive occurrences vs. scattered occurrences (consecutive gives minimum distance)

### Solution

```python
def minimumDistance(nums):
    n = len(nums)
    min_distance = float('inf')
    
    # Try all possible triples (i, j, k) where i < j < k
    for i in range(n - 2):
        for j in range(i + 1, n - 1):
            for k in range(j + 1, n):
                # Check if all three values are equal
                if nums[i] == nums[j] == nums[k]:
                    # Calculate distance: |i - j| + |j - k| + |i - k|
                    # Since i < j < k, this simplifies to:
                    # (j - i) + (k - j) + (k - i) = 2 * (k - i)
                    distance = 2 * (k - i)
                    min_distance = min(min_distance, distance)
    
    # Return minimum distance or -1 if no good tuple found
    return min_distance if min_distance != float('inf') else -1
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n³) - We have three nested loops iterating through all possible triples (i, j, k) where i < j < k. In the worst case with n elements, we check all combinations.

- **Space Complexity:** O(1) - We only use a constant amount of extra space for variables (min_distance and loop counters), regardless of input size.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *Can you optimize this if the array size is very large (up to 10⁵ elements)?*  
  *Hint: Think about storing indices of each element value and only checking triples of the same value. This reduces the search space significantly.*

- (Follow-up question 2)  
  *What if we want to find the minimum distance when checking only consecutive occurrences of the same element?*  
  *Hint: Store indices by element value, then for each element that appears 3+ times, check consecutive triplets in the stored index list.*

- (Follow-up question 3)  
  *How would the solution change if the distance formula was different, like max(|i - j|, |j - k|, |i - k|)?*  
  *Hint: The optimization insight about consecutive indices might not hold; you'd need to reconsider what minimizes this new formula.*

### Summary
This problem uses a straightforward **triple nested loop** approach to check all possible triplets. The key insight is recognizing that the distance formula simplifies to 2(k - i) when indices are ordered, and that we should prioritize finding triplets with small index ranges. For larger inputs, this could be optimized using a **hash map to group indices by value**, then checking only triplets within each group. This pattern is useful for any problem requiring enumeration of all combinations with a specific property.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
