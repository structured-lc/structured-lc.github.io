### Leetcode 2183 (Hard): Count Array Pairs Divisible by K [Practice](https://leetcode.com/problems/count-array-pairs-divisible-by-k)

### Description  
Given an integer array `nums` and an integer `k`, find the number of pairs of indices (i, j) such that 0 ≤ i < j < n and the product `nums[i] × nums[j]` is divisible by k.

In other words, count all pairs where multiplying two elements gives a result that is divisible by the given k.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`, `k = 2`  
Output: `7`  
*Explanation: Valid pairs are (0,1), (0,3), (1,2), (1,3), (1,4), (2,3), (3,4) since their products (2, 4, 6, 8, 10, 12, 20) are all divisible by 2.*

**Example 2:**  
Input: `nums = [1,2,3,4]`, `k = 5`  
Output: `0`  
*Explanation: No product among any pairs is divisible by 5.*

**Example 3:**  
Input: `nums = [5,10,15,20]`, `k = 5`  
Output: `6`  
*Explanation: All pairs' products are divisible by 5.*

### Thought Process (as if you’re the interviewee)  
Brute-force would check all pair combinations (0 ≤ i < j < n) and for each, test if nums[i] × nums[j] % k == 0. But this is O(n²), which becomes infeasible for large n.

Key optimization:  
If gcd(nums[i], k) × gcd(nums[j], k) is divisible by k, then nums[i] × nums[j] is divisible by k.  
- For each number, compute g = gcd(num, k) and count the frequency of each unique gcd value seen so far.
- For each incoming num, for every existing gcd g' in the frequency map, if (g × g') % k == 0, then all such pairs are valid.
- Incrementally accumulate the count.

This approach leverages number theory to reduce unnecessary checks, with preprocessing and careful use of maps.

### Corner cases to consider  
- Empty input array.
- Only one element in array (no pairs).
- k = 1 (all pairs are valid since every number divides 1).
- Array where all elements are 1 or same value.
- k is a very large or very small value relative to nums.
- nums contains both small and large values.

### Solution

```python
def countPairs(nums, k):
    # Helper to compute gcd
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    from collections import defaultdict

    count = defaultdict(int)
    result = 0

    for num in nums:
        g = gcd(num, k)
        # For every previous gcd value, if their product is divisible by k,
        # count the pairs
        for prev_g, freq in count.items():
            if (g * prev_g) % k == 0:
                result += freq
        count[g] += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × d), where n is the length of nums and d is the number of unique divisors of k (since gcd can only be one of them). Since d ≤ 128 for k ≤ 1e5, this is efficient.
- **Space Complexity:** O(d), for the count map storing frequencies for each possible gcd.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is being updated with new elements and you have to answer queries online?
  *Hint: Think about dynamic maps or segment trees for dynamic additions.*

- Can you return all pairs rather than just the count?
  *Hint: Store indices alongside gcd frequencies—take care with space overhead!*

- What if k is very large (e.g., up to 1e18)?
  *Hint: Can you precompute all divisors/gcds quickly? Is integer overflow a concern?*

### Summary
This solution uses the "math plus hash map" pattern, turning a brute-force O(n²) problem into an O(n × d) one by leveraging properties of divisibility and gcd.  
This technique of using gcd and careful frequency counting is widely applicable in number theory problems, especially those involving divisibility of products or pairs.