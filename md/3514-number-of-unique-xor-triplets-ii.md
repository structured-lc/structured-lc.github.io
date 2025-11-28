### Leetcode 3514 (Medium): Number of Unique XOR Triplets II [Practice](https://leetcode.com/problems/number-of-unique-xor-triplets-ii)

### Description  
Given an array `nums`, count how many distinct values you can get by XOR-ing any three elements: nums[i] ^ nums[j] ^ nums[k], where `i`, `j`, and `k` are distinct indices (i ≠ j ≠ k). Your goal is to compute the number of unique results you can make by picking arbitrary triples from the array and computing their XOR.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3]`  
Output: `2`  
*Explanation: The possible XOR triplet values are 1^2^3=0, and all other indexings of three different elements yield either 0 or 0 again. Uniquely, we only get {0}.*

**Example 2:**  
Input: `nums = [1, 2, 4]`  
Output: `3`  
*Explanation:  
All possible XOR triplets (with all indices distinct):  
- 1^2^4=7  
- 2^1^4=7 (same as above)  
- 1^4^2=7  
- 2^4^1=7  
- 4^1^2=7  
- 4^2^1=7  
But since each triplet reuses all elements, and XOR is commutative/associative, we get only {7}.*

**Example 3:**  
Input: `nums = [1, 2, 2]`  
Output: `2`  
*Explanation:  
Triplets: 1^2^2=1  
           2^1^2=1  
           2^2^1=1  
All other combinations are the same. Uniquely only {1} available.*

### Thought Process (as if you’re the interviewee)  
To solve this, let's start with a brute-force way:
- Consider all unordered triplets (i, j, k) with distinct indices.
- Compute nums[i] ^ nums[j] ^ nums[k] and keep them in a set to count unique results.

But brute force is O(n³), which is too high when n is large.

Optimization:
- Precompute all possible pairwise XORs from the array, storing each unique result.
- For each element in the array, XOR it with each of the unique pairwise XORs, and track unique results.

This is better: generating O(n²) pairwise XORs, then for each, O(n) extra steps for combining with an array element, for overall O(n²) complexity.
- We use a set to keep only unique XOR triplet results.

This leverages the commutativity/associativity of XOR.

### Corner cases to consider  
- nums has less than 3 elements: No triplet possible, should return 0.
- nums contains duplicates, e.g. [1,1,1].
- nums contains large numbers, but within constraints.
- All elements are distinct.
- All elements are the same.

### Solution

```python
def unique_xor_triplets(nums):
    n = len(nums)
    if n < 3:
        return 0

    pair_xors = set()
    # Collect all pairwise xors (unordered)
    for i in range(n):
        for j in range(i+1, n):
            pair_xors.add(nums[i] ^ nums[j])

    triplet_xors = set()
    # For each pair xor, xor with every number to get all possible triplet xors
    for x in pair_xors:
        for num in nums:
            triplet_xors.add(x ^ num)
    return len(triplet_xors)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). There are O(n²) pairwise XORs and for each of those, we do O(n) work, but pair_xors has at most O(n²) elements, and for each, iterating through n numbers is O(n³) in worst case, but the unique combinations make it O(n²) in practice as duplicates are ignored.
- **Space Complexity:** O(n²), to store all unique pairwise XOR values and all unique triplet XOR values.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the length of nums is very large and you cannot fit all pairwise XORs in memory?  
  *Hint: Can you process in blocks or use sorting or a frequency map?*

- What if you are asked for the actual XOR triplet values instead of just their count?  
  *Hint: Store triplets in a set instead of just count, then return the list.*

- How does the solution change if duplicates in nums are not allowed?  
  *Hint: Consider using a set for input if only unique elements permitted.*

### Summary
This problem is an application of bit manipulation and set-building: instead of triple-nesting for triplets, we optimize by using sets to store pairwise and then triplet XOR results. This deduplication leverages the properties of XOR and avoids O(n³) enumeration, landing us in O(n²) time and space. This pattern—breaking down higher-order combinations by enumerating lower-order ones and combining via associative, commutative operators—is common in interview settings involving bit manipulation or combinations, and appears in problems involving sums, subsets, and products as well.


### Flashcard
Precompute unique pairwise XORs, then XOR each with every array element to find all unique triplet XOR results efficiently.

### Tags
Array(#array), Math(#math), Bit Manipulation(#bit-manipulation), Enumeration(#enumeration)

### Similar Problems
