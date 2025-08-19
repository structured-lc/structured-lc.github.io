### Leetcode 2195 (Medium): Append K Integers With Minimal Sum [Practice](https://leetcode.com/problems/append-k-integers-with-minimal-sum)

### Description  
Given an integer array `nums` and an integer `k`, append k **unique** positive integers that do **not** appear in `nums` so that the sum of the k integers you append is as small as possible. Return the sum of the k integers you appended, not the sum of the whole array.
  
– The new elements must be *unique* and *positive*.
– The chosen numbers must *not* already exist in `nums`.

### Examples  

**Example 1:**  
Input: `nums = [1,4,25,10,25]`, `k = 2`  
Output: `5`  
*Explanation: Append the smallest missing values not in nums: 2 and 3. Their sum is 2 + 3 = 5.*

**Example 2:**  
Input: `nums = [5,6]`, `k = 6`  
Output: `25`  
*Explanation: The six smallest positive integers not in [5,6] are 1,2,3,4,7,8. Their sum is 1 + 2 + 3 + 4 + 7 + 8 = 25.*

**Example 3:**  
Input: `nums = [2,3,10,1]`, `k = 4`  
Output: `18`  
*Explanation: The four smallest missing positive integers: 4,5,6,7. Sum is 4 + 5 + 6 + 7 = 22.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to start from 1, scan up, and for each number not in `nums`, add it to our result until we’ve picked k values. This would work for small k/nums but is inefficient for large ranges since `nums` and k can each be up to 10⁹.

Optimally:
- First, sort and deduplicate `nums` since duplicates don't help.
- Then, scan from 1 upward, finding intervals between elements in the sorted list. For gaps, compute how many new values we can pick from each interval (missing numbers between `nums[i]` and `nums[i+1]`).
- For each gap, append as many missing as you can (up to the total `k`)—the interval sum can be done arithmetically rather than iteratively.
- If after scanning all existing `nums` you still need more, take the remaining numbers right after the max of `nums`.

This greedy/gap-based approach guarantees minimal selections and runs in O(n log n) due to the sort, but otherwise just linear passes.

### Corner cases to consider  
- `nums` contains duplicates (should be handled by deduplication).
- All numbers from 1 to k are already present in `nums`.
- `nums` is empty or contains just one element.
- `nums` includes very large or very small numbers.
- k is very large, much larger than the length of `nums`.

### Solution

```python
def minimalKSum(nums, k):
    # Remove duplicates and sort the array
    nums = sorted(set(nums))
    n = len(nums)
    res = 0
    prev = 0  # Start from 0 so we can consider 1 upwards

    for num in nums:
        # Calculate count of missing numbers between prev and num-1
        if num - prev > 1:
            gap = num - prev - 1
            take = min(k, gap)
            # Sum numbers from prev+1 to prev+take
            first = prev + 1
            last = prev + take
            count = take
            res += (first + last) * count // 2  # arithmetic progression sum
            k -= take
            if k == 0:
                return res
        prev = num

    # If still have k left, take numbers after last element in nums
    if k > 0:
        first = prev + 1
        last = prev + k
        count = k
        res += (first + last) * count // 2

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the size of nums. The sorting dominates (removing duplicates is O(n)), and then a single pass over nums for the arithmetic sum.
- **Space Complexity:** O(n), required for deduplication and the sorted new array. No additional significant space is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you also needed to return the list of the k integers appended, not just their sum?  
  *Hint: Record the numbers as you fill each gap and after the last max.*

- How would your solution change if negative integers were allowed, or if 0 counted as positive?  
  *Hint: Adjust lower bound for candidate values; definition of "positive" would change.*

- Can you solve it in O(n) time if nums is already sorted and deduplicated?  
  *Hint: Yes, just skip the sort step.*

### Summary
This problem uses the **greedy pattern**—pick the smallest possible valid numbers, exploiting arithmetic progressions for fast summation. It combines sorting, deduplication, and interval arithmetic. This pattern for finding missing values or intervals shows up frequently in math-based greedy and set cover problems. It is also useful for minimum sum/subset problems or where "avoid duplication" in a set is required.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Remove K Digits(remove-k-digits) (Medium)
- Find All Numbers Disappeared in an Array(find-all-numbers-disappeared-in-an-array) (Easy)
- Kth Missing Positive Number(kth-missing-positive-number) (Easy)
- Maximum Number of Integers to Choose From a Range I(maximum-number-of-integers-to-choose-from-a-range-i) (Medium)
- Maximum Number of Integers to Choose From a Range II(maximum-number-of-integers-to-choose-from-a-range-ii) (Medium)