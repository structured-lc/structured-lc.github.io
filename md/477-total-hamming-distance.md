### Leetcode 477 (Medium): Total Hamming Distance [Practice](https://leetcode.com/problems/total-hamming-distance)

### Description  
Given an array of integers nums, the goal is to find the sum of Hamming distances between all pairs of numbers in the array. The Hamming distance between two integers is the number of bit positions at which their binary representations differ.

### Examples  

**Example 1:**  
Input=`[4, 14, 2]`  
Output=`6`  
*Explanation:*  
4 = 0100, 14 = 1110, 2 = 0010  
HammingDistance(4, 14) = 2 (bits at position 1 and 2 differ),  
HammingDistance(4, 2) = 2 (bits at position 1 and 2 differ),  
HammingDistance(14, 2) = 2 (bits at position 0 and 3 differ).  
Total = 2 + 2 + 2 = 6.

**Example 2:**  
Input=`[4, 14, 4]`  
Output=`4`  
*Explanation:*  
4 = 0100, 14 = 1110  
HammingDistance(4, 14) = 2,  
HammingDistance(4, 14) = 2,  
HammingDistance(4, 4) = 0.  
Total = 2 + 2 + 0 = 4.

**Example 3:**  
Input=`[]`  
Output=`0`  
*Explanation:*  
No pairs exist, so distance is 0.

### Thought Process (as if you’re the interviewee)  
**Brute-force approach:**  
Iterate through every pair of indices (i, j) where 0 ≤ i < j < n, compute the Hamming distance for each pair by XORing the two numbers and counting the set bits, then sum all these distances.  
**Problem:** Time complexity is O(n² × b), where b is the number of bits, which is too slow for large n.

**Optimization:**  
Instead of comparing each pair, consider each bit position separately. For each bit position, count how many numbers have that bit set (call this c). The number of pairs with different values at this bit is then c × (n - c). Sum this product across all bit positions.  
**Why this works:** Each bit contributes independently to the total Hamming distance. If c numbers have the bit set, and (n - c) have it unset, each of these c × (n - c) pairs will have a difference at this bit.  
**Advantage:** Time complexity drops to O(n × b), which is much better for large n.  
**Trade-off:** The logic is less intuitive at first, but leverages bit properties to achieve linear performance.

### Corner cases to consider  
- **Empty array:** No pairs, so total distance is 0.
- **Single element:** No pairs, so total distance is 0.
- **All elements equal:** All distances are 0.
- **Large numbers:** Ensure the loop over bits covers all possible bit positions (usually up to 31).
- **All elements have 0 in same bit position:** Contributes 0 to total distance.

### Solution

```python
def totalHammingDistance(nums):
    # Initialize result
    total = 0
    n = len(nums)
    # Iterate over each bit position (0 to 30, for 32-bit integers)
    for i in range(32):
        # Count numbers with the i-th bit set
        count = 0
        for num in nums:
            if (num >> i) & 1:
                count += 1
        # The number of pairs with different bits at this position
        total += count * (n - count)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × b), where n is the number of elements in nums and b is the number of bits (32 for 32-bit integers). For each bit, we traverse the entire array.
- **Space Complexity:** O(1). Only constant extra space is used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

If you had to compute the Hamming distance for a sliding window of size k, how would you adapt your solution?  
*Hint: Consider how the count at each bit position changes as the window slides.*

Can you generalize this to other distances, such as edit distance or Euclidean distance, for the same array?  
*Hint: Think about whether the independence of bits still holds for those distances.*

How would you handle this problem in a distributed environment where the array is too large for a single machine?  
*Hint: Split the array into chunks, compute partial results, and combine them in a map-reduce style.*

### Summary  
The optimized approach exploits the independence of bit positions in numbers, counting the number of pairs with differing bits at each position and summing their contributions. This is a common pattern in bit manipulation problems, and similar approaches apply to problems involving binary features or pairwise differences in bitwise properties.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Hamming Distance(hamming-distance) (Easy)
- Sum of Digit Differences of All Pairs(sum-of-digit-differences-of-all-pairs) (Medium)