### Leetcode 3678 (Easy): Smallest Absent Positive Greater Than Average [Practice](https://leetcode.com/problems/smallest-absent-positive-greater-than-average)

### Description  
Given an integer array `nums`, return the **smallest absent positive integer** that is **strictly greater than the average** of the array.  
- The output must be strictly greater than the average (mean) of all the elements in `nums`.
- The answer must be strictly positive (>0).
- The answer must not already appear in `nums`.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `4`  
*Explanation: The average is (1+2+3)/3 = 2. Smallest positive > 2 not in [1,2,3] is 4.*

**Example 2:**  
Input: `nums = [2, 2, 2]`  
Output: `3`  
*Explanation: Average is (2+2+2)/3 = 2. Smallest positive > 2 not in nums is 3.*

**Example 3:**  
Input: `nums = [1, 4, 2, 10]`  
Output: `5`  
*Explanation: Average is (1+4+2+10)/4 = 4.25. Smallest positive integer > 4.25 is 5. 5 is not in nums, so answer is 5.*

**Example 4:**  
Input: `nums = [3, 3, 4, 5]`  
Output: `6`  
*Explanation: Average is (3+3+4+5)/4 = 3.75. Smallest positive > 3.75 not in nums is 6.*

**Example 5:**  
Input: `nums = [-1, -2, -3]`  
Output: `1`  
*Explanation: Average is (-1-2-3)/3 = -2. Smallest positive > -2 is 1, and 1 not in nums.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  1. Compute average of the array.
  2. Start from average + 1 (rounded up), check if it is in the array.
  3. If yes, increase by 1 and repeat. If not, it's the answer.
  4. If average is negative, the answer will always be 1 if 1 isn't in the array, otherwise next smallest positive.
  5. To check “not in nums” quickly, use a set for O(1) lookups.

- **Optimized Approach:**  
  - The brute force is efficient since we only look for one number, and array size is not huge.
  - Using a set, the checking is fast. The only real work is computing the mean and possibly iterating until a missing integer is found.
  - There’s no reason to overcomplicate with additional sorting or advanced in-place techniques, because the problem only needs a positive integer above a threshold and not present.

### Corner cases to consider  
- Array contains only negative numbers (average negative; answer is always 1 if not present).
- The average is a non-integer (floats); make sure you always round up for the candidate.
- The smallest candidate is already present in the array (must try next, and so on).
- Array contains duplicates.
- Array contains only positive numbers.
- Array contains large numbers but missing small positive numbers.

### Solution

```python
def smallest_absent_positive_greater_than_average(nums):
    # Calculate the average of the array
    avg = sum(nums) / len(nums)
    # Create a set for O(1) lookup to check if candidate is present
    num_set = set(nums)
    # Start checking from ⌊avg⌋ + 1 (must be strictly greater than average), but always at least 1
    # Using int(avg) + 1 ensures correctness if avg is positive; if avg is negative, 1 is always smallest positive.
    candidate = max(1, int(avg) + 1)
    # Check for the smallest absent positive that's > avg
    while candidate in num_set:
        candidate += 1
    return candidate
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).
  - Computing the average and building the set are both O(n).
  - In the worst case, we might have to try a few consecutive candidates, but in practice, this is much less than n.
- **Space Complexity:** O(n) for storing the set of array elements for quick lookup.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is too large to fit in memory?  
  *Hint: Can you process portions and keep track of "seen" values in chunks or use external storage?*

- How would you handle floating point imprecision in the average?  
  *Hint: Be careful with rounding and strict "greater than" checks with floats!*

- How would you optimize if presence checks needed to be done in-place with no extra space?  
  *Hint: Would need to adapt "first missing positive integer" trick, but problem constraints may not require this.*

### Summary
This problem demonstrates a classic “frequency checking + math threshold” pattern.  
The solution uses a hash set for O(1) presence checking of the next smallest absent integer above a computable threshold (here, the average of the array).  
This pattern is common for problems involving “missing positive integer” (such as LeetCode 41), but here with the added twist of a dynamic lower bound (strictly above average).  
It’s also a good reminder to handle edge cases of averages and positive integer ranges carefully.

### Tags

### Similar Problems
