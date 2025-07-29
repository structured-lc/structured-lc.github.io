### Leetcode 599 (Easy): Minimum Index Sum of Two Lists [Practice](https://leetcode.com/problems/minimum-index-sum-of-two-lists)

### Description  
Given two lists of strings, **list1** and **list2**, find all common strings between the two lists that have the smallest sum of their indices (the sum of the position of the string in both lists). If there are multiple answers with the same smallest index sum, return all of them.

For example, if "happy" is at index 0 in list1 and index 1 in list2, its index sum is 1. If several strings have this minimal index sum, list them all. The order of the result doesn't matter.

### Examples  

**Example 1:**  
Input: `list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]`  
Output: `["sad","happy"]`  
*Explanation: Both "happy" (index sum 0+1=1) and "sad" (index sum 1+0=1) are common strings. The next closest, "good", has index sum 2+2=4. So output both "happy" and "sad".*

**Example 2:**  
Input: `list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]`  
Output: `["Shogun"]`  
*Explanation: Only "Shogun" is common (index sum 0+3=3).*

**Example 3:**  
Input: `list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]`  
Output: `["Shogun"]`  
*Explanation: "Shogun" (0+1=1), "KFC" (3+0=3), "Burger King" (2+2=4). The lowest is "Shogun".*

### Thought Process (as if you’re the interviewee)  

First, the **brute-force** approach would compare every element in list1 to every element in list2, checking for common strings and computing i + j for the index sum. This is O(m × n) where m and n are the sizes of the lists — not efficient for longer lists.

To **optimize**, I’d use a map (dictionary) to store the indices of all values in one list (say, list1).  
- Then, loop through list2, and for every value seen in the map, calculate the total index sum.
- Keep track of the minimum index sum so far, and collect all strings achieving that minimum.
- This reduces time to O(m+n), since we only do two linear passes.

This is a good tradeoff: it leverages a hash table for constant lookups and ensures we find all minimum-sum common strings in linear time.

### Corner cases to consider  
- One or both lists are empty (output should be empty).
- No common elements at all (output should be empty).
- All elements are common but with different index sums.
- Multiple strings tie for the same minimal index sum.
- Lists with only one element.
- Strings with spaces or varying cases (unless problem says case-insensitive, assume case-sensitive).
- Very large lists (check efficiency).

### Solution

```python
def findRestaurant(list1, list2):
    # Map each string in list1 to its index
    index_map = {}
    for i, name in enumerate(list1):
        index_map[name] = i

    min_sum = float('inf')
    result = []

    # Iterate through list2, checking for common strings
    for j, name in enumerate(list2):
        if name in index_map:
            index_sum = index_map[name] + j
            if index_sum < min_sum:
                # Found better (smaller) index sum, reset result
                result = [name]
                min_sum = index_sum
            elif index_sum == min_sum:
                # Found another with same minimal sum
                result.append(name)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m = len(list1) and n = len(list2).  
  - O(m) to build the index map for list1  
  - O(n) to scan through list2 and check for each potential match.
- **Space Complexity:** O(m) for the hash map storage.  
  - Result list worst case is O(min(m, n)) if all entries are common and minimal.

### Potential follow-up questions (as if you’re the interviewer)  

- What if one or both lists are extremely large and can't fit in memory?
  *Hint: Can you process the lists using streaming, or external memory techniques?*
  
- What if you want to return only one minimal string instead of all?
  *Hint: Just keep one answer instead of a list, update on smaller or equal index sum.*

- What if the input strings can be duplicated in the lists?
  *Hint: Should you consider the first occurrence only? What does the problem say about uniqueness?*

### Summary
This problem is a classic **hash map lookup pattern** — mapping items of one collection for O(1) access and checking for minimal property (here, index sum) during a linear scan of the second collection. This technique is common in set intersection with extra criteria, two-sum, or frequency counting problems. It's highly efficient for scenarios that need “find all common elements with a property in O(n) time.”