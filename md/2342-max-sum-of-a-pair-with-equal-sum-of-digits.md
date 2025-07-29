### Leetcode 2342 (Medium): Max Sum of a Pair With Equal Sum of Digits [Practice](https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits)

### Description  
Given a 0-indexed array of positive integers, find the pair of distinct indices \(i\) and \(j\) (where \(i \neq j\)) such that the sum of the digits of nums[i] is equal to the sum of the digits of nums[j]. Out of all such valid pairs, return the *maximum* value of nums[i] + nums[j]. If no such pair exists, return -1.

### Examples  

**Example 1:**  
Input: `nums = [18,43,36,13,7]`  
Output: `54`  
Explanation:   
- sum_digits(18) = 1+8 = 9  
- sum_digits(43) = 4+3 = 7  
- sum_digits(36) = 3+6 = 9  
- sum_digits(13) = 1+3 = 4  
- sum_digits(7) = 7  
Possible pairs with equal digit sums:  
  - (0,2): 18 and 36 (both sum to 9), sum = 54  
  - (1,4): 43 and 7 (both sum to 7), sum = 50  
Maximum is 54.

**Example 2:**  
Input: `nums = [10,12,19,14]`  
Output: `-1`  
Explanation:  
No pair has the same digit sum. Return -1.

**Example 3:**  
Input: `nums = [51,42,33,60]`  
Output: `93`  
Explanation:  
sum_digits(51)=6, 42=6, 33=6, 60=6  
Try each pair: 51+42=93, 51+33=84, 51+60=111, ...  
Actually, 60+51=111 is highest possible. Output is 111.


### Thought Process (as if you’re the interviewee)  

First, the brute-force way would be to try all pairs (O(n²)), comparing their digit sums, keeping track of the maximum if they match. But this is inefficient for large n.

Instead, I’d use a hash map: For each number, compute its digit sum. Store the largest number seen so far for each digit sum. When I see another number with the same digit sum, the best current answer is the sum of this number plus the largest number seen with that digit sum. Update maximum accordingly.

This keeps overall work linear: For each number, do digit sum (O(#digits)), hash map lookup and update (O(1)), so overall O(n).

This is a classic mapping problem: find a property (sum of digits) that buckets elements, and keep track of the max in each bucket.

### Corner cases to consider  
- No two numbers share the same digit sum (should return -1).
- Multiple numbers with same digit sum (choose the two largest for the max sum).
- Only one element in nums (no pair, return -1).
- nums contains large numbers (digit sum computation should be fast).
- All numbers have the same digit sum.
- Numbers with digit sum = 0 (not possible since nums[i] ≥ 1).

### Solution

```python
def maximum_sum(nums):
    # Helper: compute sum of digits
    def digit_sum(x):
        s = 0
        while x > 0:
            s += x % 10
            x //= 10
        return s

    max_pair_sum = -1
    digit_sum_to_max = {}

    for num in nums:
        ds = digit_sum(num)
        if ds in digit_sum_to_max:
            # if we've seen another number with the same digit sum, compute pair sum
            pair_sum = num + digit_sum_to_max[ds]
            if pair_sum > max_pair_sum:
                max_pair_sum = pair_sum
            # update the largest for this digit sum bucket
            if num > digit_sum_to_max[ds]:
                digit_sum_to_max[ds] = num
        else:
            # first entry for this digit sum
            digit_sum_to_max[ds] = num

    return max_pair_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d), where n = length of nums, d = average number of digits per num (≤ 9 for numbers up to 10⁹). Effectively O(n).
- **Space Complexity:** O(m), where m is the number of unique digit sums (worst-case up to about 81, since max digit sum for 1 ≤ x ≤ 10⁹ is 9\*9=81). So space is negligible and O(1) with respect to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return all pairs achieving the maximum sum, not just the sum?
  *Hint: Store both top two (or all) largest numbers for each digit sum bucket.*

- How would you generalize this if “sum of digits” was replaced by another hashable property?
  *Hint: Use the same map/bucket approach; just change the key.*

- What if numbers could be negative or zero?
  *Hint: Carefully review corner cases; zeros handled correctly, negative digit sum calculation could differ.*

### Summary

This problem uses a **hash map bucket by property** pattern, where elements are grouped by sum of digits, and the top-matching elements are combined for the result. It's a classic way to handle pair-maximum or frequency-type interview questions and applies to problems involving “equal constraints” across pairs or groups.