### Leetcode 1679 (Medium): Max Number of K-Sum Pairs [Practice](https://leetcode.com/problems/max-number-of-k-sum-pairs)

### Description  
Given an array of integers `nums` and an integer `k`, you are asked to find the **maximum number of pairs** `(i, j)` where `i < j` such that `nums[i] + nums[j] == k`. Each element in the array can be used **at most once** in a pair, so you remove those two numbers from consideration when you form a pair. You need to return the maximum number of such pairs that can be formed from the array.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4], k = 5`  
Output: `2`  
*Explanation:  
We can form 2 pairs: (1,4) and (2,3), both sum to 5. No other valid pairs exist.*

**Example 2:**  
Input: `nums = [3,1,3,4,3], k = 6`  
Output: `1`  
*Explanation:  
We can form only 1 pair: (3,3). Other options do not sum up to 6 given the one-use constraint.*

**Example 3:**  
Input: `nums = [1,2,3,4,5,6], k = 7`  
Output: `3`  
*Explanation:  
Possible pairs are (1,6), (2,5), and (3,4). Three pairs is the maximum.*

### Thought Process (as if you’re the interviewee)  

Start with brute-force:

- A naive approach is to try all possible pairs and count the ones that sum to `k`. 
- After finding each, remove both elements and continue. 
- This would be O(n²) as you might scan the array repeatedly.

Can we do better?

- A **two-pointer** approach works if the array is sorted.
  - Sort `nums` (O(n log n)).
  - Set pointers at the start (`l = 0`) and end (`r = n-1`) of the array.
  - If `nums[l] + nums[r] == k`, it's a pair; move both pointers inward.
  - If their sum < k, increment `l`.
  - If sum > k, decrement `r`.
  - This is O(n log n) due to sorting, O(1) extra space.

Even better, a **hash map** can achieve O(n) time:

- Use a map to track how many times each number is available.
- For each number `num`:
  - Check if `k - num` is in the map and count > 0.
  - If yes, that's a pair: decrement both `num` and `k - num` counts.
  - Else, increment the count for `num`.
- This avoids sorting and uses O(n) space.

Between two-pointer and hashmap, hashing is a common and fast choice for arbitrary input arrays. If asked about trade-offs: 
- Sorting gives O(1) space and is easy to implement if destructive change is okay.
- Hashmap is O(n) space but no sort needed, great for large arrays or when you want to preserve input.

### Corner cases to consider  
- Empty array input (`nums = []`)
- No numbers sum to `k` (e.g. all elements are larger than `k`)
- All elements are the same but don't pair to `k`
- Repeated elements where pairs are possible only up to a certain count (e.g. `[3,3,3]`, `k=6`)
- Only one element in `nums`
- Negative numbers in the array
- Multiple valid pairings: consider that an element can be used only once.

### Solution

```python
def maxOperations(nums, k):
    # Dictionary to count available numbers
    count = {}
    operations = 0

    for num in nums:
        complement = k - num
        # If complement is available, form a pair
        if count.get(complement, 0) > 0:
            operations += 1
            count[complement] -= 1
        else:
            # Otherwise, store current number for future pairing
            count[num] = count.get(num, 0) + 1
    return operations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in `nums`. Each element is processed exactly once, and hash-map operations are constant expected time.
- **Space Complexity:** O(n). In the worst case, every number goes into the dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is already sorted?  
  *Hint: Try a two-pointer approach for O(1) extra space.*

- How would you handle very large input (streaming or limited memory)?  
  *Hint: Can you find pairs in batches or approximate with limited counts?*

- What if instead of just counting, you were to list all pairs' indices?  
  *Hint: Keep track of indices in addition to counts—will need to store lists/arrays of indices.*

### Summary
The **hashmap counting pattern** is used here: for each number, check for its complement and form a pair if possible, otherwise record its occurrence for future pairings. It's a typical *complement-to-sum* problem, similar to **Two Sum** but with the one-use constraint, and it appears frequently in problems involving **pairing and one-time use**. The two-pointer pattern is a good space-saving variant when sorting is acceptable or the array is already sorted.