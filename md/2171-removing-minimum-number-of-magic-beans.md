### Leetcode 2171 (Medium): Removing Minimum Number of Magic Beans [Practice](https://leetcode.com/problems/removing-minimum-number-of-magic-beans)

### Description  
You are given an array of positive integers `beans`, where each element at index *i* represents the number of magic beans in the iᵗʰ bag. Your task is to remove the minimum total number of beans so that every **non-empty** bag contains the same number of beans. You may remove zero or more beans from each bag, but you may not add beans. Note that after your operation, you cannot have an empty bag if you wish to "equalize" bags—they should all have at least one bean.

### Examples  

**Example 1:**  
Input: `beans = [4, 1, 6, 5]`  
Output: `4`  
*Explanation: Remove 1 bean from the bag with 5 beans (now has 4), and 2 beans from the bag with 6 beans (now has 4), and 1 bean from the bag with 1 bean (remove all). Total beans removed = 1 + 2 + 1 = 4.  
It's optimal to set every non-empty bag to have 4 beans.*

**Example 2:**  
Input: `beans = [2, 10, 3, 2]`  
Output: `7`  
*Explanation: Remove 1 from the 3-bean bag and 7 from the 10-bean bag: [2,2,2,2]. Total = 7.*

**Example 3:**  
Input: `beans = [1, 1, 1, 1]`  
Output: `0`  
*Explanation: All bags already have the same amount, so no beans need to be removed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible "target" value between 1 and max(beans). For each possible value, calculate beans that must be removed from every bag to either match that value or be empty. But this is very inefficient (O(n²) time).

- **Observation:**  
  It's optimal to pick one of the existing bean values as the final bean count. We can't create beans, so we can only lower counts. Eliminating all bags above a certain value is not optimal; instead, we should set all non-empty bags to a chosen value (must be ≤ current values). If we sort beans, for each beans[i], if we use beans[i] as the target, all bags ≥ i keep beans[i], rest are emptied. The minimum total removal is sum(beans) - beans[i] × (#bags that keep beans[i]). Evaluate this for each beans[i].

- **Trade-offs:**  
  Solution runs in O(n log n) due to sort, but only O(n) after that. The space usage is O(1) (discounting input). Sorting everything is justified since we only need to loop and do prefix math per index. It's much more efficient than brute-force.

### Corner cases to consider  
- Empty array: beans = [].  
- Only one bag.  
- All zeros or invalid input (by problem, all bags have positive beans).  
- All bags equal already.  
- Very large numbers (potential overflow).

### Solution

```python
def minimumRemoval(beans):
    # Sort the array so we can efficiently compute possibilities
    beans.sort()
    total_beans = sum(beans)
    n = len(beans)
    min_removal = float('inf')

    # Try using beans[i] as the target for all non-empty bags
    for i, b in enumerate(beans):
        # Number of bags that will have b beans = (n - i)
        current_removal = total_beans - b * (n - i)
        min_removal = min(min_removal, current_removal)
    
    return min_removal
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Required for sorting, then a linear scan over n.
- **Space Complexity:** O(1)  
  Only a couple of integer variables, not counting input array (can sort in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- What if bags can be empty after removal?  
  *Hint: Can you consider zero as a valid target value for the bags?*

- What if it's expensive to remove beans from a bag, i.e., cost per removal is different for each bag?  
  *Hint: How does this change the formula for current_removal? Need to factor weighted cost per bag.*

- Can you do the same thing with a stream of beans (cannot sort)?  
  *Hint: Do you need a running count or frequency counter? What trade-offs appear?*

### Summary
This problem uses the **prefix sum and sorting pattern**. By sorting and leveraging the properties of the possible "target" values, we efficiently find the minimal removal. The idea to set all non-empty bags to a chosen candidate value and remove the rest generalizes to many equalizing array problems, e.g., “make all values equal with minimal cost.” This approach is broadly useful in other interview settings involving array adjustment or normalization problems.