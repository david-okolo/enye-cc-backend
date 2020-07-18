import { ProfileModel } from '../models/Profile'

export const getPastSearches = async (sub: string) => {
  const profile: any = await ProfileModel.findById(sub).catch(e => {
    throw e;
  })

  if (profile) {
    return profile.pastSearches
  } else {
    return []
  }
}

export const createPastSearch = async (payload: any) => {
  let profile: any = await ProfileModel.findById(payload.sub).catch(e => {
    throw e;
  });

  if (!profile) {
    profile = await ProfileModel.create({
      _id: payload.sub,
      pastSearches: []
    }).catch(e => {
      throw e
    });
  }

  const search = {
    keyword: payload.query,
    radius: payload.radius,
    timestamp: Date.now()
  };

  profile.pastSearches.push(search);

  profile.save();
}