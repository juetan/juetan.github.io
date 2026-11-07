import { readFileSync } from 'node:fs';

/** 友链状态 */
export type FriendStatus = 'active' | 'inactive';

/** 友链数据结构 */
export interface Friend {
  /** 头像地址 */
  avatar: string;
  /** 站点名称 */
  name: string;
  /** 站点介绍 */
  description: string;
  /** 站点地址 */
  url: string;
  /** 站点状态 */
  status: FriendStatus;
}

/** 配置文件路径 */
const configUrl = new URL('../config/friends.json', import.meta.url);

/** 必填字段 */
const requiredKeys = ['avatar', 'name', 'description', 'url', 'status'] as const;

/** 合法状态 */
const validStatus: FriendStatus[] = ['active', 'inactive'];

/**
 * 加载友链配置
 * @see .vitepress/config/friends.json
 */
export default {
  load(): Friend[] {
    const raw = readFileSync(configUrl, 'utf-8');
    const friends: Friend[] = JSON.parse(raw);
    if (!Array.isArray(friends)) {
      throw new Error('友链配置必须是一个数组');
    }
    for (const friend of friends) {
      for (const key of requiredKeys) {
        if (!friend[key]) {
          throw new Error(`友链配置缺少字段 ${key}: ${JSON.stringify(friend)}`);
        }
      }
      if (!validStatus.includes(friend.status)) {
        throw new Error(`友链配置的 status 必须是 ${validStatus.join(' 或 ')}: ${friend.name}`);
      }
    }
    return friends;
  },
};

export const data: Friend[] = [];
